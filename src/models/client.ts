import mongoose, { Schema } from 'mongoose'

const ClientSchema = new Schema({
    client_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    api_key: { type: String, required: true, unique: true },
}, { collection: 'clients' })
ClientSchema.index({ client_id: 1 })
ClientSchema.index({ api_key: 1 })
ClientSchema.index({ email: 1 })
export default mongoose.model('Client', ClientSchema)