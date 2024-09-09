import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSaleService } from "../services/CreateSaleService";
import { ProductsRepository } from "../repositories/productsRepository";
import { SalesRepository } from "../repositories/salesRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { AppError } from "../error/AppError";

const SalesRouter = Router()

SalesRouter.use(ensureAuthenticated)

SalesRouter.post('/create', async (request, response) =>{
    const {
        products
    } = request.body;

    const {id} = request.user

    const usersRepository = new UsersRepository();
    const findUser = await usersRepository.FindById(id)

    if (!findUser){
        throw new AppError('user not found', 401)
    }

    const createSaleService = new CreateSaleService();
    try {
        const sale = await createSaleService.execute({
            buyerId:id,
            products
        })

        return response.status(200).json(sale)

    } catch (error) {
        throw new AppError('sale creation failed')
    }
   
})

SalesRouter.get('/search', async (request, response) =>{
    const {
        type
    } = request.body;
    console.log("entrei")
    const productsRepository = new ProductsRepository();

    const products = await productsRepository.ListbyType(type);


    return response.status(200).json(products)
})

SalesRouter.get('/list', async (request, response) =>{

    const {id} = request.user
    
    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.FindById(id)

    if (!findUser){
        console.log("não achei")
        throw new AppError('user not found', 401)
    }
    console.log("achei")
    if (!findUser.type.includes('master')){
        throw new AppError('user not allowed', 403)
    }

    const salesRepository = new SalesRepository();

    const sales = await salesRepository.List();

    return response.status(200).json(sales)
})



export {SalesRouter}