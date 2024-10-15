import { SalesRepository } from "../repositories/salesRepository";
import {ProductsRepository} from "../repositories/productsRepository";
import { StockRepository } from "../repositories/stockRepository";
import { ItemsRepository } from "../repositories/itemsRepository";
import { AppError } from "../error/AppError";

interface Request{
    buyerId: string,
    products: number[]

}

interface Response{
    id:number,
    buyerId:string,
    date:Date,
    totalValue: number
}

class CreateSaleService {
    public async execute({
        buyerId,
        products,
    }: Request): Promise<Response>{

        const productsRepository = new ProductsRepository();

        const salesRepository = new SalesRepository();

        const itemsRepository = new ItemsRepository();

        const stockRepository = new StockRepository();

        let totalValue = 0

        const date = new Date(new Date().setMonth(new Date().getMonth()))
        
        for(let i = 0; i < products.length;i++){
            const findProduct = await productsRepository.FindById(products[i]);
            if (!findProduct){
                throw new AppError('product not found')
            }

            totalValue = (totalValue + findProduct.price);

            let findStock = await stockRepository.ListByDate(findProduct.id);
            if (!findStock){
                throw new AppError('stock not found')
            }

            stockRepository.update(findStock.id,findStock.quantity-1);

        }

        const sale = await salesRepository.create({
            buyerId,
            date,
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