import { Router } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ProductsRepository } from "../repositories/productsRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { UpdateProductService } from "../services/UpdateProductService";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const ProductRouter = Router();

ProductRouter.use(ensureAuthenticated)
ProductRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

ProductRouter.post('/create', async (request, response) =>{
    const {
        name,
        description,
        price,
        quantity,
        brand
    } = request.body;
    
    const createProductService = new CreateProductService();
    try {
        const product = await createProductService.execute({
            name,
            description,
            price,
            quantity,
            brand
        })
        return response.status(200).json(product)
    } catch (error) {
        return response.status(400).json('product creation failed')
    }

})


ProductRouter.get('/list', async (request, response) =>{

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.List();

    return response.status(200).json(products)
})



ProductRouter.put('/update', async (request, response) =>{
    const {
        productId,
        quantity,
        price
    } = request.body

    const updateProductService = new UpdateProductService()

    try {
        const product = await updateProductService.execute({
            productId,
            quantity,
            price
        })
        return response.status(200).json(product)

    } catch (error) {
        return response.status(400).json('update failed')
    }

})


export {ProductRouter}