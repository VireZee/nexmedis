import mongoose, { Schema } from 'mongoose'

const ClientSchema = new Schema({
    client_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    api_key: { type: String, required: true, unique: true },
}, { collection: 'clients' })
export default mongoose.model('Client', ClientSchema)