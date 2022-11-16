import { Router } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ProductsRepository } from "../repositories/productsRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const ProductRouter = Router();

ProductRouter.use(ensureAuthenticated)
ProductRouter.use(ensureAdmin)

ProductRouter.post('/', async (request, response) =>{
    const {
        name,
        description,
        price,
        quantity
    } = request.body;

    const createProductService = new CreateProductService();
    try {
        const product = await createProductService.execute({
            name,
            description,
            price,
            quantity
        })
        return response.status(200).json(product)
    } catch (error) {
        return response.status(400).json('product creation failed')
    }

})

export {ProductRouter}