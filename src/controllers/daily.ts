import redis from '@database/redis.js'
import cache from "@cache/local.js"
import logSchema from '@models/log.js'

const daily = async (res: Res) => {
    // Redis
    const key = `cache:usage:daily:v1`
    try {
        const cache = await redis.json.get(key)
        if (cache) return res.json(cache)
    } catch (e) {
        console.warn('[Redis] GET failed, fallback to local LRU cache: ', e)
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
                timestamp: { $gte: seven_day, $lte: now }
            }
        },
        {
            $group: {
                _id: {
                    client_id: '$client_id',
                    day: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.client_id': 1, '_id.day': 1 } }
    ])
    const newCache: Record<string, { date: string; requests: number }[]> = {}
    for (const u of usage) {
        const cid = u._id.client_id
        if (!newCache[cid]) newCache[cid] = []
        newCache[cid]!.push({
            date: u._id.day,
            requests: u.count
        })
    }
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