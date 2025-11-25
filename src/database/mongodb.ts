import '@config/env.js'
import mongoose from 'mongoose'

const mongodb = async () => {
    try {
        // single node, no shard, no replica set
        await mongoose.connect(`${process.env['MONGODB_URI']}`)
        // for sharded cluster or replica set
        // await mongoose.connect(`${process.env['MONGODB_URI_REPLICA_SET']}`)
    } catch (e) {
        console.error('[MongoDB] connection error.')
    }
}
export default mongodb