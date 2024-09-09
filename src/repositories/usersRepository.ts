import {v4 as uuidV4} from 'uuid';
import { users, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateUser{
    name: string,
    document:string,
    email:string,
    type:string,
    ativo:number,
    password:string
}

class UsersRepository {

    public async create({
        name,
        document,
        email,
        type,
        ativo,
        password
    }: ICreateUser): Promise<users> {
        const user = await prisma.users.create({
            data: {
                id: uuidV4(),
                name,
                document,
                email,
                type,
                ativo,
                password
            },
        });
        return user
    }

    public async FindByDocument(document:string): Promise<users | null>{
        const findUser = await prisma.users.findFirst({
            where: {
                document
            }
        })
        return findUser
    }

    public async FindById(id:string): Promise<users | null>{
        const findUser = await prisma.users.findFirst({
            where: {
                id
            }
        })
        return findUser
    }
    
    public async List (): Promise<users[]>{
        const users = await prisma.users.findMany({
            orderBy:{
                id: 'desc'
            }
        })

        return users
    }
    public async delete (document:string): Promise<users>{
        console.log(document)
        const products = await prisma.users.update({
            where:{
                document
            },
            data:{
                ativo: 1
            }
        })
        return products
    }

}



export {UsersRepository}