import type { Request, Response } from 'express'

declare global {
    type Req = Request
    type Res = Response
}
export {}