import mongoose, { Schema } from 'mongoose'

const LogSchema = new Schema({
    client_id: { type: String, required: true },
    api_key: { type: String, required: true },
    ip: { type: String, required: true },
    endpoint: { type: String, required: true },
    timestamp: { type: Date }
}, { collection: 'logs' })
// /api/usage/daily
// Fetch total daily requests per client for the last 7 days
LogSchema.index({ client_id: 1, timestamp: -1 })
// /api/usage/top
// Fetch top 3 clients with the highest total requests in the last 24 hours
LogSchema.index({ timestamp: -1, client_id: 1 })
export default mongoose.model('Log', LogSchema)