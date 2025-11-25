import redis from '@database/redis.js'
import { publishUsageUpdate } from '@database/redis.js'
import clientSchema from '@models/client.js'
import logger from '@services/logger.js'
import retry from '@services/retry.js'

const log = async (req: Req, res: Res) => {
    try {
        const { api_key, ip, endpoint, timestamp } = req.body
        if (!api_key || !ip || !endpoint) return res.status(400).json({ error: 'API Key, IP and Endpoint are required!' })
        const ts = timestamp ? new Date(timestamp) : new Date()
        if (isNaN(ts.getTime())) return res.status(400).json({ error: 'Invalid timestamp' })
        const client = await clientSchema.findOne({ api_key }).lean()
        if (!client) return res.status(401).json({ error: 'Invalid API Key!' })
        try {
            retry(() => redis.INCRBY(`hits:${client.client_id}`, 1))
        } catch (e) {
            console.warn('[Redis] Counter error: ', e)
        }
        logger({
            client_id: client.client_id,
            api_key,
            ip,
            endpoint,
            timestamp: ts
        })
        try {
            await publishUsageUpdate(client.client_id, ts)
        } catch (e) {
            console.warn('[Redis] Failed to publish update: ', e)
        }
        return res.status(200).json({ message: 'ok' })
    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
export default log