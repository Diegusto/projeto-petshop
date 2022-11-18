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

        const encryptedPassword = await hash(password, 10)

        const user: IUser = await usersRepository.create({
            name,
            document,
            email,
            password:encryptedPassword,
            type
        })

        delete user.password

        return user
    }
}

export{CreateUserService}