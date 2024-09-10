import { pets, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IPets{
    userId: string,
    name: string,
    type: string
}

class PetsRepository{
    public async create({
        userId,
        name,
        type

    }:IPets): Promise<pets>{
        const pet = await prisma.pets.create({
            data:{
                userId,
                name,
                type
            }
        })
        return pet
    }

    public async listByUser(userId:string): Promise<pets[]>{
        const pets = await prisma.pets.findMany({
            where:{
                userId
            }
        })
        return pets
    }



}

export {PetsRepository}