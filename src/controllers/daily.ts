import redis from '@database/redis.js'
import cache from "@cache/local.js"
import logSchema from '@models/log.js'

const daily = async (req: Req, res: Res) => {
    const { client_id } = req.query
    if (!client_id) return res.status(400).json({ error: 'Client ID required!' })
    // Redis
    const key = `cache:usage:daily:${client_id}:v1`
    try {
        const cache = await redis.json.get(key)
        if (cache) return res.json(cache)
    } catch (e) {
        console.log('[Redis] GET failed, fallback to local LRU cache: ', e)
    }
    // LRU
    const local = cache.get(key)
    if (local) return res.json(local)
    // DB fallback
    const now = new Date()
    const seven_day = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7)
    const usage = await logSchema.aggregate([
        {
            $match: {
                client_id,
                timestamp: { $gte: seven_day, $lte: now }
            }
        },
        {
            $group: {
                _id: {
                    day: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.day": 1 } }
    ])
    const newCache = usage.map(u => ({
        date: u._id.day,
        requests: u.count
    }))
    try {
        await Promise.all([
            redis.json.SET(key, '$', newCache),
            redis.EXPIRE(key, 3600)
        ])
    } catch (e) {
        console.warn('[Redis] SET failed, fallback to local LRU: ', e)
    }
    cache.set(key, newCache)
    return res.status(200).json(newCache)
}
export default daily