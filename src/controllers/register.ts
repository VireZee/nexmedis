import crypto from 'crypto'
import Client from '@models/client.js'
import jwt from 'jsonwebtoken'

const register = async (req: Req, res: Res) => {
    try {
        const { email, name } = req.body
        if (!name || !email) return res.status(400).json({ error: 'Name and Email required!' })
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return res.status(400).json({ error: 'Invalid Email!' })
        const exists = await Client.findOne({ email }).lean()
        if (exists) return res.status(400).json({ error: 'Email already registered!' })
        const hash = crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
        const half = hash.length / 2
        const client_id = hash.slice(0, half)
        const api_key = hash.slice(half)
        const client = new Client({ client_id, name, email, api_key })
        await client.save()
        const token = jwt.sign({ client_id }, process.env['SECRET_KEY']!, { algorithm: 'HS512', expiresIn: '7d' })
        return res.status(201).json({ client_id, name, email, api_key, token })
    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
export default register