import { sales, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface ISales{
    buyerId: string,
    date: Date,
    totalValue: number
}

class SalesRepository{
    public async create({
        buyerId,
        date,
        totalValue

    }:ISales): Promise<sales>{
        const sale = await prisma.sales.create({
            data:{
                buyerId,
                date,
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

    public async ListByMonth (date1:Date,date2:Date): Promise<sales[]>{
        const sales = await prisma.sales.findMany({
            where:{
                date:{
                    gte:date1,
                    lte:date2
                }
            }
        })

        return sales
    }

}

export {SalesRepository}