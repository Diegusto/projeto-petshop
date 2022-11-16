import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}  

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    const secret = process.env.TOKEN_KEY

    if (!authHeader){
        throw new Error('JWT token is missing')
    }

    if (!secret){
        throw new Error('invalid token')
    }

    const [, token] = authHeader.split(' ');

    try {
        const tokenDecoded = verify(token, secret);

        const  {sub} = tokenDecoded as ITokenPayload;
        
        request.user = {
            id: sub
        };

        return next();

    } catch {
        throw new Error ('Invalid token')
    }

}

export {ensureAuthenticated}