import { suppliers, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface ISuppliers{
    productId: number,
    name: string,
    phone: string,
}

class SuppliersRepository{
    public async create({
        productId,
        name,
        phone

    }:ISuppliers): Promise<suppliers>{
        const supplier = await prisma.suppliers.create({
            data:{
                productId,
                name,
                phone
            }
        })
        return supplier
    }

    public async listByProduct(productId:number): Promise<suppliers[]>{
        const suppliers = await prisma.suppliers.findMany({
            where:{
                productId
            }
        })
        return suppliers
    }



}

export {SuppliersRepository}