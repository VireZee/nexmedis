import express from 'express'
import swagger from '@config/swagger.js'
import mongodb from '@database/mongodb.js'
import prefetch from '@jobs/prefetch.js'
import router from '@routes/route.js'
import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(router)
;(async () => {
    await Promise.all([
        mongodb(),
        prefetch()
    ]),
    setInterval(prefetch, 1000 * 60 * 5)
    app.listen(process.env['PORT'])
})()