import { Router } from 'express'
import auth from 'middleware/auth.js'
import register from '@controllers/register.js'
import log from '@controllers/log.js'

const router = Router({
    caseSensitive: true,
    strict: true
})
router.post('/api/register', register)
router.post('/api/logs', log)
router.get('/api/usage/daily', auth)
router.get('/api/usage/top', auth)
export default router