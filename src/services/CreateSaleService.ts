import { SalesRepository } from "../repositories/salesRepository";
import {ProductsRepository} from "../repositories/productsRepository";
import { status } from "@prisma/client";

interface Request{
    buyerId: string,
    productId: number,
    quantity: number

}

interface Response{
    id:number,
    buyerId:string,
    productId:number,
    status:status,
    dueDate:Date,
    totalValue: number
}

class CreateSaleService {
    public async execute({
        buyerId,
        productId,
        quantity,
    }: Request): Promise<Response>{
        const productsRepository = new ProductsRepository();
        const findProduct = await productsRepository.FindById(productId);

        if (!findProduct){
            throw new Error('product not found')
        }

        let status:status = 'pending'

        if (findProduct.quantity < quantity){
            status = 'order'
        }

        const totalValue = (findProduct.price * quantity);
        console.log(totalValue)
        const dueDate = new Date(new Date().setMonth(new Date().getMonth()+1))

        const salesRepository = new SalesRepository();

        const sale = await salesRepository.create({
            buyerId,
            productId,
            status,
            dueDate,
            totalValue

        })
        return sale
    }
}

export {CreateSaleService}