import { services, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IServices{
    type: string,
    price: number
}

class ServicesRepository{
    public async create({
        type,
        price

    }:IServices): Promise<services>{
        const service = await prisma.services.create({
            data:{
                type,
                price
            }
        })
        return service
    }

    public async FindById (id:number): Promise<services | null>{
        console.log(id)
        const service = await prisma.services.findFirst({
            where:{
                id
            }
        })
        return service
    }
    public async List (): Promise<services[] | null>{
    
        const service = await prisma.services.findMany({
            orderBy:{
                id:'desc'
            }
        })
        return service
    }



}

export {ServicesRepository}