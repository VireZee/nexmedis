import redis from '@database/redis.js'
import local from "@cache/local.js"
import logSchema from '@models/log.js'

const top = async (_: Req, res: Res) => {
    // Redis
    const key = 'cache:usage:top:v1'
    try {
        const cache = await redis.json.get(key)
        if (cache) return res.json(cache)
    } catch (e) {
        console.warn('[Redis] GET failed, fallback to local LRU cache: ', e)
    }
    // LRU
    const localCache = local.get(key)
    if (localCache) return res.json(localCache)
    // DB fallback
    const now = new Date()
    const dayAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    const usage = await logSchema.aggregate([
        {
            $match: { timestamp: { $gte: dayAgo, $lte: now } }
        },
        {
            $group: {
                _id: '$client_id',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 3
        }
    ])
    const newCache = usage.map(u => ({
        client_id: u._id,
        requests: u.total
    }))
    try {
        await Promise.all([
            redis.json.SET(key, '$', newCache),
            redis.EXPIRE(key, 3600)
        ])
    } catch (e) {
        console.warn('[Redis] SET failed, fallback to LRU: ', e)
    }
    local.set(key, newCache)
    return res.status(200).json(newCache)
}
export default top