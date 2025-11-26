import { EventEmitter } from 'events'

const events = new EventEmitter()
events.setMaxListeners(2000)
export default events