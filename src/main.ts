import express from 'express'
import mongodb from '@database/mongodb.js'

const app = express()
app.use(express.json());
(async () => {
    await mongodb()
    app.listen(process.env['PORT'])
})()