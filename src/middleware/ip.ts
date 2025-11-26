const whitelist = process.env['WHITELIST_IPS']!.split(',').map(ip => ip.trim())
const ip = (req: Req, res: Res, next: Next) => {
    const ip = req.ip || req.socket.remoteAddress!
    if (!whitelist.includes(ip)) return res.status(403).json({ error: 'IP not allowed!' })
    return next()
}
export default ip