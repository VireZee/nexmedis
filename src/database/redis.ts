import { createClient } from 'redis'
import local from '@cache/local.js'
import retry from '@services/retry.js'
import queue from '@services/queue.js'

const redis = createClient({ url: process.env['REDIS_URI']! })
export const redisPub = redis.duplicate()
export const redisSub = redis.duplicate()
try {
    await Promise.all([
        redis.connect(),
        redisPub.connect(),
        redisSub.connect()
    ])
} catch (e) {
    console.error('[Redis] Connection error: ', e)
}
export const publishUsageUpdate = async (client_id: string, timestamp: Date) => {
    try {
        await retry(() => redisPub.publish('usage_updates', JSON.stringify({ client_id, timestamp })))
    } catch {
        queue(client_id, timestamp)
    }
}
await redisSub.subscribe('usage_updates', async (message: string) => {
    const dailyKey = `cache:usage:daily:v1`
    try {
        const payload = JSON.parse(message)
        const { client_id, timestamp } = payload
        const today = timestamp.toISOString().slice(0, 10)
        let dailyCache = await retry(() => redis.json.get(dailyKey)) as Record<string, { date: string, requests: number }[]> | null
        if (!dailyCache) dailyCache = {}
        let dailyClient = dailyCache[client_id] ?? []
        const entry = dailyClient.find(e => e.date === today)
        if (entry) entry.requests++
        else dailyClient.push({ date: today, requests: 1 })
        dailyCache[client_id] = dailyClient
        await retry(() => Promise.all([
            redis.json.SET(dailyKey, '$', dailyCache),
            redis.EXPIRE(dailyKey, 3600)
        ]))
        local.set(dailyKey, dailyCache)
    } catch (e) {
        console.error('[Redis] Subscribe error: ', e)
    }
})
export default redis