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
}

export {SalesRepository}