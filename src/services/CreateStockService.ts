import { StockRepository } from "../repositories/stockRepository";

interface Request{
    productId: number,
    quantity: number,
    expirationDate: Date
}

interface Response {
    id: number,
    productId: number,
    quantity: number,
    expirationDate: Date
}

class CreateStockService{
    public async execute({
        productId,
        quantity,
        expirationDate
    }: Request): Promise<Response> {
        const stockRepository = new StockRepository();
        const stock = await stockRepository.create({
            productId,
            quantity,
            expirationDate
        })
        return stock
    }
}

export {CreateStockService}