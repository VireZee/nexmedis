import { redisPub } from '@database/redis.js'
import retry from './retry.js'

const pending: { client_id: string, timestamp: Date }[] = []
let run = false
const queue = (client_id: string, timestamp: Date) => {
    pending.push({client_id, timestamp})
    republish()
}
const republish = () => {
    if (run) return
    run = true
    const interval = setInterval(async () => {
        if (pending.length === 0) {
            run = false
            clearInterval(interval)
            return
        }
        const updates = pending.splice(0, pending.length)
        try {
            for (const update of updates) await retry(() => redisPub.publish('usage_updates', JSON.stringify(update)))
        } catch {
            pending.unshift(...updates)
        }
    }, 2000)
}
export default queue