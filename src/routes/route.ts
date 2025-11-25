import { Router } from 'express'
import auth from 'middleware/auth.js'
import rateLimit from 'middleware/rateLimit.js'
import register from '@controllers/register.js'
import log from '@controllers/log.js'
import daily from '@controllers/daily.js'
import top from '@controllers/top.js'

const router = Router({
    caseSensitive: true,
    strict: true
})
router.post('/api/register', register)
router.post('/api/logs', rateLimit, log)
router.get('/api/usage/daily', auth, daily)
router.get('/api/usage/top', auth, top)
export default router