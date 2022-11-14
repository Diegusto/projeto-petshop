import { Router } from "express";
import { UsersRepository } from "../repositories/usersRepository";
import {sign} from "jsonwebtoken";
import { compare } from "bcryptjs";

const loginRouter = Router();

loginRouter.post('/', async (request,response) =>{
    const {
        document,
        password
    } =request.body;


    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.FindByDocument(document);

    if (!findUser){
        return response.status(401).json('wrong user document')
    }

    const matchedPassword = await compare(password, findUser.password)
    console.log(matchedPassword)

    if (!matchedPassword){
        return response.status(401).json('wrong password')
    }

    const secrect = process.env.TOKEN_KEY

    if (!secrect){
        return response.status(401).json('user not found')
    }

    const token = sign({}, secrect, {
        subject: findUser.id,
        expiresIn: "2d"
    })

    return response.status(200).json(token)

})

export {loginRouter}



