import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSaleService } from "../services/CreateSaleService";
import { ProductsRepository } from "../repositories/productsRepository";
import { SalesRepository } from "../repositories/salesRepository";

const SalesRouter = Router()

SalesRouter.use(ensureAuthenticated)

SalesRouter.post('/create', async (request, response) =>{
    const {
        productId,
        quantity
    } = request.body;

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

SalesRouter.get('/search', async (request, response) =>{
    const {
        brand
    } = request.body;

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.ListbyBrand(brand);


    return response.status(200).json(products)
})

SalesRouter.get('/list', async (request, response) =>{
    const {
        status
    } = request.body;

    const salesRepository = new SalesRepository();

    const sales = await salesRepository.listByStatus(status)

    return response.status(200).json(sales)
})

SalesRouter.put('/update', async (request, response) =>{
    const {
        id,
        status
    } = request.body;

    const salesRepository = new SalesRepository();

    const findSale = salesRepository.FindById(id)

    if (!findSale){
        return response.status(400).json('sale not found')
    }

    const sale = await salesRepository.UpdateStatus(id, status)

    return response.status(200).json(sale)

})


export {SalesRouter}