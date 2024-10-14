import { stock, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface IStock{
    productId: number,
    quantity: number,
    expirationDate: Date,
}

class StockRepository{
    public async create({
        productId,
        quantity,
        expirationDate

    }:IStock): Promise<stock>{
        const stock = await prisma.stock.create({
            data:{
                productId,
                quantity,
                expirationDate
            }
        })
        return stock
    }

    public async listByProduct(productId:number): Promise<stock[]>{
        const stock = await prisma.stock.findMany({
            where:{
                productId
            }
        })
        return stock
    }

    public async FindById(id: number): Promise<stock | null>{
        const stock = await prisma.stock.findFirst({
            where:{
                id
            }
        })
        return stock
    }

    public async update (id:number,quantity:number): Promise<stock>{
        const stock = await prisma.stock.update({
            where:{
                id
            },
            data:{
                quantity
            }
        })
        return stock
    }



}

export {StockRepository}