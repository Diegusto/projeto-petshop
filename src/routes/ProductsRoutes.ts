import { Router } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ProductsRepository } from "../repositories/productsRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { UpdateProductService } from "../services/UpdateProductService";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";

const ProductRouter = Router();

ProductRouter.use(ensureAuthenticated)
ProductRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

ProductRouter.post('/create', async (request, response) =>{
    const {
        name,
        description,
        price,
        type
    } = request.body;
    
    const createProductService = new CreateProductService();
    try {
        const product = await createProductService.execute({
            name,
            description,
            price,
            type
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

ProductRouter.post('/listtype', async (request, response) =>{
    const {
        type
    } = request.body;

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.ListbyType(type);

    return response.status(200).json(products)
})



ProductRouter.put('/update', async (request, response) =>{
    const {
        productId,
        price
    } = request.body

    const updateProductService = new UpdateProductService()

    try {
        const product = await updateProductService.execute({
            productId,
            price
        })
        return response.status(200).json(product)

    } catch (error) {
        return response.status(400).json('update failed')
    }

})

ProductRouter.delete('/delete', async (request, response) => {
    const {
        productId
    } = request.body

    const productsRepository = new ProductsRepository();
try {
    const remove = await productsRepository.delete(productId)
    return response.status(200).json(`produte ${remove}, removido com sucesso`)
} catch (error) {
    throw new AppError('delete failed')
}

})


export {ProductRouter}