import { Router } from "express";
import { CreateStockService } from "../services/CreateStockService";
import { UpdateStockService } from "../services/UpdateStockService";
import { StockRepository } from "../repositories/stockRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";

const StockRouter = Router();

StockRouter.use(ensureAuthenticated)
StockRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

StockRouter.post('/create', async (request, response) =>{
    const {
        productId,
        quantity,
        expirationDate
    } = request.body;
    

    const createStockService = new CreateStockService();
    try {
        const stock = await createStockService.execute({
            productId,
            quantity,
            expirationDate
        })
        return response.status(200).json(stock)
    } catch (error) {
        return response.status(400).json('stock creation failed')
    }

})

StockRouter.put('/update', async (request, response) =>{
    const {
        stockId,
        quantity
    } = request.body

    const updateStockService = new UpdateStockService()

    try {
        const stock = await updateStockService.execute({
            id: stockId,
            quantity
        })
        return response.status(200).json(stock)

    } catch (error) {
        return response.status(400).json('update failed')
    }

})


StockRouter.post('/list', async (request, response) =>{
    const {
        productId
    } = request.body

    const stockRepository = new StockRepository();

    const stock = await stockRepository.listByProduct(productId);

    return response.status(200).json(stock)
})


export {StockRouter}