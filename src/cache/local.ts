import { LRUCache } from 'lru-cache'
export default new LRUCache({
    max: 500,
    ttl: 1000 * 60 * 60
})