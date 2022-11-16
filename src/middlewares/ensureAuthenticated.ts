import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../AppError";

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
        throw new AppError('JWT token is missing',401)
    }

    if (!secret){
        throw new AppError('invalid token',401)
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
        throw new AppError ('Invalid token',401)
    }

}

export {ensureAuthenticated}