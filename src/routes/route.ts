import { Router } from 'express'
import register from '@controllers/register.js'

const router = Router({
    caseSensitive: true,
    strict: true
})
router.post('/api/register', register)
router.post('/api/logs')
router.get('/api/usage/daily')
router.get('/api/usage/top')
export default router