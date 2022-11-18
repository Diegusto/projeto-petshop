import { products, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IProducts{
    name: string,
    description:string,
    price:number,
    quantity:number,
    brand:string
}

class ProductsRepository {
    public async create ({
        name,
        description,
        price,
        quantity,
        brand
    }: IProducts): Promise<products> {
        const product = await prisma.products.create({
            data:{
                name,
                description,
                price,
                quantity,
                brand
            }
        })
        return product
    }

    public async update (id:number, quantity?:number, price?:number): Promise <products>{
        const product = await prisma.products.update({
            where:{
                id
            },
            data:{
                quantity,
                price
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

    public async ListbyBrand (brand:string): Promise<products[]>{
        const products = await prisma.products.findMany({
            orderBy:{
                id: 'desc'
            },
            where:{
                brand
            }
        })

        return products
    }

    public async delete (id:number): Promise<products>{
        const products = await prisma.products.delete({
            where:{
                id
            }
        })
        return products
    }


}

export {ProductsRepository}