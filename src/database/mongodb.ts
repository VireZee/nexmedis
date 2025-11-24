import '@config/env.js'
import mongoose from 'mongoose'

const mongodb = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env['MONGODB_USER']}:${process.env['MONGODB_PASS']}@${process.env['DB_HOST']}:${process.env['MONGODB_PORT']}/${process.env['MONGODB_NAME']}?directConnection=true&authSource=${process.env['MONGODB_NAME']}&authMechanism=SCRAM-SHA-256`)
    } catch (e) {
        throw e
    }
}
export default mongodb