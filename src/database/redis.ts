import { createClient } from 'redis'

const redis = createClient({ url: process.env['REDIS_URI']! })
try {
    await redis.connect()
} catch (e) {
    throw e
}
const redisSub = redis.duplicate()
try {
    await redisSub.connect()
} catch (e) {
    throw e
}
await redisSub.subscribe('usage_updates', async (message) => {
    try {
        const payload = JSON.parse(message)
        await redis.del(`cache:usage:daily:${payload.client_id}:v1`).catch(() => { })
        await redis.del(`cache:usage:top:v1`).catch(() => { })
    } catch (e) {
        throw e
    }
})
const publishUsageUpdate = async (payload: { client_id: string }) => {
    try {
        await redis.publish('usage_updates', JSON.stringify(payload))
    } catch (e) {
        throw e
    }
}
export { redisSub, publishUsageUpdate }
export default redis