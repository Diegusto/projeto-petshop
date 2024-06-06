import { SalesRepository } from "../repositories/salesRepository";
import {ProductsRepository} from "../repositories/productsRepository";
import { ItemsRepository } from "../repositories/itemsRepository";
import { AppError } from "../error/AppError";

interface Request{
    buyerId: string,
    products: number[]

}

interface Response{
    id:number,
    buyerId:string,
    dueDate:Date,
    totalValue: number
}

class CreateSaleService {
    public async execute({
        buyerId,
        products,
    }: Request): Promise<Response>{
        const productsRepository = new ProductsRepository();

        let totalValue = 0


        const dueDate = new Date(new Date().setMonth(new Date().getMonth()+1))

        const salesRepository = new SalesRepository();

        const itemsRepository = new ItemsRepository();
        
        for(let i = 0; i < products.length;i++){
            const findProduct = await productsRepository.FindById(products[i]);
            if (!findProduct){
                throw new AppError('product not found')
            }
            totalValue = (totalValue + findProduct.price);
        }

        const sale = await salesRepository.create({
            buyerId,
            dueDate,
            totalValue

        })

        
        for(let i = 0; i < products.length;i++){
            const findProduct = await productsRepository.FindById(products[i]);
            if (!findProduct){
                throw new AppError('product not found')
            }
            const items = await itemsRepository.create({
                saleId: sale.id,
                ProductId: products[i]
            })

        }

        return sale
    }
}

export {CreateSaleService}