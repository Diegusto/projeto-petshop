import { Router } from "express";
import { UsersRepository } from "../repositories/usersRepository";
import {sign} from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../AppError";
import { verify } from "jsonwebtoken";

const loginRouter = Router();

loginRouter.post('/', async (request,response) =>{
    const {
        document,
        password
    } =request.body;


    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.FindByDocument(document);

    if (!findUser){
        throw new AppError('user not found',401)
    }

    const matchedPassword = await compare(password, findUser.password)
    console.log(matchedPassword)

    if (!matchedPassword){
        throw new AppError('wrong password',401)
    }

    const secrect = process.env.TOKEN_KEY

    const refresh = process.env.REFRESH_KEY

    if (!secrect){
        throw new AppError('user not found', 401)
    }

    if (!refresh){
        throw new AppError('user not found', 401)
    }

    const token = sign({}, secrect, {
        subject: findUser.id,
        expiresIn: "1d"
    })

    const refreshToken = sign({}, refresh,{
        subject:findUser.id,
        expiresIn: "10d"
    })

    return response.status(200).json({token, refreshToken})

})

loginRouter.post('/refresh', async (request,response) =>{
    
    const authHeader = request.headers.authorization;
    const refToken = process.env.REFRESH_KEY
    const secret = process.env.TOKEN_KEY

    if (!authHeader){
        throw new AppError('refresh token is missing',401)
    }

    if (!refToken){
        throw new AppError('invalid token',401)
    }

    if (!secret){
        throw new AppError('invalid token',401)
    }

    const [, refresh] = authHeader.split(' ');
    console.log(refresh)

    try {
        const tokenDecoded = verify(refresh, refToken);
    } catch {
        throw new AppError('invalid token', 401)
    }

    const [, token] = authHeader.split (' ');

    return response.status(200).json(token)

})

export {loginRouter}



