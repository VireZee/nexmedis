import { setTimeout } from 'node:timers/promises'
export default async <T>(fn: () => Promise<T>) => {
    let lastErr
    for (let i = 0; i < 3; i++) {
        try {
            return await fn()
        } catch (e) {
            lastErr = e
            await setTimeout(200)
        }
    }
    throw lastErr
}