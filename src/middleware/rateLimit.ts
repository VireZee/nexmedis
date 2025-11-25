import redis from '@database/redis.js'

const rateLimit = async (req: Req, res: Res, next: Next) => {
    const { api_key } = req.body
    if (!api_key) return res.status(400).json({ error: 'API Key required!' })
    const key = `rate:${api_key}`
    const count = await redis.INCRBY(key, 1)
    if (count === 1) await redis.EXPIRE(key, 3600)
    if (count > 1000) return res.status(429).json({ error: 'Rate limit exceeded!' })
    return next()
}
export default rateLimit