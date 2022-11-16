import { products, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IProducts{
    name: string,
    description:string,
    price:number,
    quantity:number
}

class ProductsRepository {
    public async create ({
        name,
        description,
        price,
        quantity
    }: IProducts): Promise<products> {
        const product = await prisma.products.create({
            data:{
                name,
                description,
                price,
                quantity
            }
        })
        return product
    }

    public async FindById (id:number): Promise<products | null>{
        const product =await prisma.products.findFirst({
            where:{
                id
            }
        })
        return product
    }

    public async List (): Promise<products[]>{
        const products = await prisma.products.findMany({
            orderBy:{
                id: 'desc'
            }
        })

        return products
    }

}

export {ProductsRepository}