import redis from '@database/redis.js'
import logSchema from '@models/log.js'
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

        await redis.json.set(key, '$', newCache)
        await redis.expire(key, 3600)
    } catch (e) {
        console.error('[Prefetch] Prefetch error: ', e)
    }
}