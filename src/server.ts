import express from 'express'
import mongodb from '@database/mongodb.js'
import router from '@routes/route.js'

const app = express()
app.use(express.json())
app.use(router)
;(async () => {
    await mongodb()
    app.listen(process.env['PORT'])
})()