import { sales, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface ISales{
    buyerId: string,
    dueDate: Date,
    totalValue: number
}

class SalesRepository{
    public async create({
        buyerId,
        dueDate,
        totalValue

    }:ISales): Promise<sales>{
        const sale = await prisma.sales.create({
            data:{
                buyerId,
                dueDate,
                totalValue
            }
        })
        return sale
    }


    public async List (): Promise<sales[]>{
        const sales = await prisma.sales.findMany({
            orderBy:{
                id: 'desc'
            }
        })
        
        return sales
    }

}

export {SalesRepository}