import redis from '@database/redis.js'
import logSchema from '@models/log.js'
import local from '@cache/local.js'
export default async () => {
    const key = 'cache:usage:top:v1'
    try {
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
        await Promise.all([
            redis.json.SET(key, '$', newCache),
            redis.EXPIRE(key, 3600)
        ])
        local.set(key, newCache)
    } catch (e) {
        console.error('[Prefetch] Prefetch error: ', e)
    }
}