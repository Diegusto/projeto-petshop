import { UsersRepository } from "../repositories/usersRepository";

interface Request{
    name:string,
    document:string,
    email:string,
    password:string,
    type:string
}

interface Response{
    name:string,
    document:string,
    email:string,
    type:string
}

const usersRepository = new UsersRepository()

class CreateUserService{
    public async execute({
        name,
        document,
        email,
        password,
        type
    }: Request): Promise<Response>{

        const checkUserExists = await  usersRepository.FindByDocument(document)

        if (!!checkUserExists){
            throw new Error('user alredy exists')
            
        }

        const user: Response = await usersRepository.create({
            name,
            document,
            email,
            password,
            type
        })

        return user
    }
}

export{CreateUserService}