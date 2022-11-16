import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSaleService } from "../services/CreateSaleService";

const SalesRuter = Router()

SalesRuter.use(ensureAuthenticated)

SalesRuter.post('/', async (request, response) =>{
    const {
        productId,
        quantity
    } = request.body

    const {id} = request.user

    console.log(id)

    const createSaleService = new CreateSaleService();
    try {
        const sale = await createSaleService.execute({
            buyerId:id,
            productId,
            quantity
        })

        return response.status(200).json(sale)

    } catch (error) {
        return response.status(400).json('sale creation failed')
    }
   
})

export {SalesRuter}