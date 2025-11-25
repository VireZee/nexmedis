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
export const publishUsageUpdate = async (client_id: string) => await redisPub.publish('usage_updates', JSON.stringify({ client_id }))
await redisSub.subscribe('usage_updates', async (message: string) => {
    try {
        const payload = JSON.parse(message)
        const dailyKey = `cache:usage:daily:${payload.client_id}:v1`
        const topKey = `cache:usage:top:v1`
        await Promise.all([
            redis.json.DEL(dailyKey).catch(() => null),
            redis.json.DEL(topKey).catch(() => null)
        ])
    } catch (e) {
        console.error('[Redis] subscribe error: ', e)
    }
})
export default redis