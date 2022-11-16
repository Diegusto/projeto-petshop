import { Router } from "express";
import { UsersRepository } from "../repositories/usersRepository";
import {sign} from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../AppError";

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

    if (!secrect){
        throw new AppError('user not found', 401)
    }

    const token = sign({}, secrect, {
        subject: findUser.id,
        expiresIn: "2d"
    })

    return response.status(200).json(token)

})

export {loginRouter}



