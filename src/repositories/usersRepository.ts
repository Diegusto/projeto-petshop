import {v4 as uuidV4} from 'uuid';
import { users, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateUser{
    name: string,
    document:string,
    email:string,
    type:string,
    password:string
}

class UsersRepository {

    public async create({
        name,
        document,
        email,
        type,
        password
    }: ICreateUser): Promise<users> {
        const user = await prisma.users.create({
            data: {
                id: uuidV4(),
                name,
                document,
                email,
                type,
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


}

export {UsersRepository}