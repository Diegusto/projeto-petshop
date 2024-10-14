import { StockRepository } from "../repositories/stockRepository";
import { AppError } from "../error/AppError";

interface Request{
    id : number,
    quantity: number
}

interface Response{
    id: number,
    productId: number,
    quantity: number,
    expirationDate: Date,
}

class UpdateStockService{
    public async execute({
        id,
        quantity
    }:Request): Promise<Response>{

        const stockRepository = new StockRepository();

        const findStock = await stockRepository.FindById(id);
        if (!findStock){
            throw new AppError('batch not found')
        }
        const stock = await stockRepository.update(id, quantity)

        return stock
    }

}

export {UpdateStockService}