import events from '@services/events.js'

const stream = (req: Req, res: Res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()
    const send = (data: { type: string, client_id: string, requests: number }) => res.write(`data: ${JSON.stringify(data)}\n\n`)
    events.on('usage', send)
    req.on('close', () => events.removeListener('usage', send))
}
export default stream