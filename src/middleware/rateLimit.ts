import redis from '@database/redis.js'
import sanitize from '@utils/sanitize.js'

const rateLimit = async (req: Req, res: Res, next: Next) => {
    const { api_key } = req.body
    if (!api_key) return res.status(400).json({ error: 'API Key required!' })
    const key = `rate:${sanitize(api_key)}`
    const minCount = await redis.HINCRBY(key, 'minute', 1)
    if (minCount === 1) await redis.HEXPIRE(key, 'minute', 60)
    if (minCount > 100) return res.status(429).json({ error: 'Rate limit exceeded (per minute)' })
    const hourCount = await redis.HINCRBY(key, 'hour', 1)
    if (hourCount === 1) await redis.HEXPIRE(key, 'hour', 3600)
    if (hourCount > 1000) return res.status(429).json({ error: 'Rate limit exceeded (per hour)' })
    return next()
}
export default rateLimit