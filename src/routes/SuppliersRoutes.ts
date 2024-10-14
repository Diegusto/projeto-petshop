import { Router } from "express";
import { CreateSupplierService } from "../services/CreateSupplierService";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";
import { SuppliersRepository } from "../repositories/suppliersRepository";

const SupplierRouter = Router();

SupplierRouter.use(ensureAuthenticated)
SupplierRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();
const suppliersRepository = new SuppliersRepository();

SupplierRouter.post('/create', async (request, response) =>{
    const {
        productId,
        name,
        phone
    } = request.body;
    
    const {id} = request.user

    const createSupplierService = new CreateSupplierService();
    try {
        const supplier = await createSupplierService.execute({
            productId,
            name,
            phone
        })
        return response.status(200).json(supplier)
    } catch (error) {
        return response.status(400).json('supplier creation failed')
    }

})


SupplierRouter.post('/list', async (request, response) =>{

    const {
        productId
    } = request.body

    const suppliers = await suppliersRepository.listByProduct(productId);

    return response.status(200).json(suppliers)
})


export {SupplierRouter}