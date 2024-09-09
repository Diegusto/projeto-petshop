import { products,PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IProducts{
    name: string,
    description:string,
    price:number,
    type:string
}

class ProductsRepository {
    public async create ({
        name,
        description,
        price,
        type
    }: IProducts): Promise<products> {
        const product = await prisma.products.create({
            data:{
                name,
                description,
                price,
                type
            }
        })
        console.log("passeiproduto")
        return product
    }


    public async FindById (id:number): Promise<products | null>{
        console.log(id)
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

    public async ListbyType (type:string): Promise<products[]>{
        const products = await prisma.products.findMany({
            orderBy:{
                id: 'desc'
            },
            where:{
                type
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

    public async update (id:number,price:number): Promise<products>{
        const products = await prisma.products.update({
            where:{
                id
            },
            data:{
                price
            }
        })
        return products
    }


}

export {ProductsRepository}