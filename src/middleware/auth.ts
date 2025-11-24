import jwt from 'jsonwebtoken'

const auth = (req: Req, res: Res, next: Next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or invalid authorization header!' })
    const token = auth.split(' ')[1]
    try {
        jwt.verify(token!, process.env['SECRET_KEY']!)
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token!' })
    }
    return next()
}
export default auth