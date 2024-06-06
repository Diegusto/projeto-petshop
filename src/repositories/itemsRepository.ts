import { items, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IItems{
    saleId: number,
    ProductId: number
}

class ItemsRepository{
    public async create({
        saleId,
        ProductId

    }:IItems): Promise<items>{
        const item = await prisma.items.create({
            data:{
                saleId,
                ProductId
            }
        })
        return item
    }

    public async listBySale(saleId:number): Promise<items[]>{
        const items = await prisma.items.findMany({
            where:{
                saleId
            }
        })
        return items
    }



}

export {ItemsRepository}