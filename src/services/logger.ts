import logSchema from '@models/log.js'
import type LogEntry from '@type/logEntry.d.ts'

const batch: LogEntry[] = []
const logger = (entry: LogEntry) => batch.push(entry)
setInterval(async () => {
    if (batch.length === 0) return
    const items = batch.splice(0, batch.length)
    try {
        await logSchema.insertMany(items, { ordered: false })
    } catch {
        batch.unshift(...items)
    }
}, 500)
export default logger