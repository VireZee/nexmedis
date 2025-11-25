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
    console.error('[Redis] connection error.')
}
export const publishUsageUpdate = async (client_id: string, timestamp: Date) => await redisPub.publish('usage_updates', JSON.stringify({ client_id, timestamp }))
await redisSub.subscribe('usage_updates', async (message: string) => {
    try {
        const payload = JSON.parse(message)
        const { client_id, timestamp } = payload
        const dailyKey = `cache:usage:daily:v1`
        const today = timestamp.toISOString().slice(0, 10)
        let dailyCache = await redis.json.get(dailyKey) as Record<string, { date: string, requests: number }[]> | null
        if (!dailyCache) dailyCache = {}
        let dailyClient = dailyCache[client_id] ?? []
        const entry = dailyClient.find(e => e.date === today)
        if (entry) entry.requests++
        else dailyClient.push({ date: today, requests: 1 })
        dailyCache[client_id] = dailyClient
        await redis.json.SET(dailyKey, '$', dailyCache)
        await redis.EXPIRE(dailyKey, 3600)
    } catch (e) {
        console.error('[Redis] subscribe error: ', e)
    }
})
export default redis