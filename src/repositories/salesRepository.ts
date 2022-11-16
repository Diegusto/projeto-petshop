import { sales, PrismaClient, status } from "@prisma/client";

const prisma = new PrismaClient();

interface ISales{
    buyerId: string,
    productId: number,
    status: status,
    dueDate: Date,
    totalValue: number
}

class SalesRepository{
    public async create({
        buyerId,
        productId,
        status,
        dueDate,
        totalValue

    }:ISales): Promise<sales>{
        console.log('entrei')
        const sale = await prisma.sales.create({
            data:{
                buyerId,
                productId,
                status,
                dueDate,
                totalValue
            }
        })
        return sale
    }

    public async listByStatus(status:status): Promise<sales[]>{
        const sales = await prisma.sales.findMany({
            where:{
                status
            }
        })
        return sales
    }

    public async UpdateStatus(id:number, status:status): Promise<sales>{
        const sales = await prisma.sales.update({
            where:{
                id
            },
            data:{
                status
            }
        })
        return sales
    }

    public async FindById(id:number): Promise<sales | null>{
        const sale = await prisma.sales.findFirst({
            where:{
                id
            }
        })
        return sale
    }

}

export {SalesRepository}