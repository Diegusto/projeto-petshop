import { Router } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { ProductsRepository } from "../repositories/productsRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";

const ProductRouter = Router();

ProductRouter.use(ensureAuthenticated)
const usersRepository = new UsersRepository();

ProductRouter.post('/create', async (request, response) =>{
    const {
        name,
        description,
        price,
        quantity,
        brand
    } = request.body;

    try {
        const {id} = request.user;
        const findUser = await usersRepository.FindById(id);
        if (!findUser){
            throw new Error('user not found');
        }
    
    
        if (!findUser.type.includes('admin') && !findUser.type.includes('master')){
            throw new Error('user not allowed');
        }
    } catch (error) {   
        return response.status(403).json('user not allowed')
    }

    
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
    try {
        const {id} = request.user;
        const findUser = await usersRepository.FindById(id);
        if (!findUser){
            throw new Error('user not found');
        }
    
    
        if (!findUser.type.includes('admin') && !findUser.type.includes('master')){
            throw new Error('user not allowed');
        }
    } catch (error) {   
        return response.status(403).json('user not allowed')
    }

    const products = await productsRepository.List();

    return response.status(200).json(products)
})



ProductRouter.get('/brand', async (request, response) =>{
    const {
        brand
    } = request.body

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.ListbyBrand(brand);
    

    return response.status(200).json(products)
})



export {ProductRouter}