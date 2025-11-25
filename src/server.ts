import express from 'express'
import mongodb from '@database/mongodb.js'
import router from '@routes/route.js'
import prefetch from '@jobs/prefetch.js'

const app = express()
app.use(express.json())
app.use(router)
;(async () => {
    await Promise.all([
        mongodb(),
        prefetch()
    ]),
    setInterval(prefetch, 1000 * 60 * 10)
    app.listen(process.env['PORT'])
})()