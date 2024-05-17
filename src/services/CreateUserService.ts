import { hash } from "bcryptjs";

import { users } from "@prisma/client";

import { UsersRepository } from "../repositories/usersRepository"
import { AppError } from "../error/AppError";

interface Request{
    name:string,
    document:string,
    email:string,
    password:string,
    type:string
}


interface IUser extends Omit<users, 'password'> {
    password?: string;
  }

const usersRepository = new UsersRepository()

class CreateUserService{
    public async execute({
        name,
        document,
        email,
        password,
        type
    }: Request): Promise<IUser>{

        const checkUserExists = await  usersRepository.FindByDocument(document)

        if (!!checkUserExists){
            throw new AppError('user alredy exists')
            
        }

        console.log("to aqui1")

        const encryptedPassword = await hash(password, 10)

        console.log("to aqui2")

        const user: IUser = await usersRepository.create({
            name,
            document,
            email,
            password:encryptedPassword,
            type
        })

        console.log("toaqui3")

        delete user.password

        return user
    }
}

export{CreateUserService}