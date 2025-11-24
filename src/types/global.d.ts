import type { Request, Response, NextFunction } from 'express'

declare global {
    type Req = Request
    type Res = Response
    type Next = NextFunction
}
export {}