import redis, { publishUsageUpdate } from '@database/redis.js'
import clientSchema from '@models/client.js'
import logSchema from '@models/log.js'
import hourKey from '@utils/hourKey.js'

const log = async (req: Req, res: Res) => {
    try {
        const { api_key, ip, endpoint, timestamp } = req.body
        if (!api_key || !ip || !endpoint) return res.status(400).json({ error: 'API Key, IP and Endpoint are required!' })
        const ts = timestamp ? new Date(timestamp) : new Date()
        if (isNaN(ts.getTime())) return res.status(400).json({ error: 'Invalid timestamp' })
        const client = await clientSchema.findOne({ api_key }).lean()
        if (!client) return res.status(401).json({ error: 'Invalid API Key!' })
        const log = await logSchema.create({
            client_id: client.client_id,
            api_key,
            ip,
            endpoint,
            timestamp: ts
        })
    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
export default log