import { createClient } from 'redis'

const redis = createClient({ url: process.env['REDIS_URI']! })
export const redisPub = createClient({ url: process.env['REDIS_URI']! })
export const redisSub = createClient({ url: process.env['REDIS_URI']! })
try {
    await Promise.all([
        redis.connect(),
        redisPub.connect(),
        redisSub.connect()
    ])
} catch (e) {
    console.log('[Redis] connection error.')
}
export const publishUsageUpdate = async (client_id: string, timestamp: Date) => await redisPub.publish('usage_updates', JSON.stringify({ client_id, timestamp }))
await redisSub.subscribe('usage_updates', async (message: string) => {
    try {
        const payload = JSON.parse(message)
        const { client_id, timestamp } = payload
        const dailyKey = `cache:usage:daily:v1`
        const topKey = `cache:usage:top:v1`
        const today = timestamp.toISOString().slice(0, 10)
        let dailyCache = await redis.json.get(dailyKey)
    } catch (e) {
        console.error('[Redis] subscribe error: ', e)
    }
})
export default redis