import { Router } from "express";
import { CreateServiceService } from "../services/CreateServiceService";
import { ServicesRepository } from "../repositories/servicesRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";

const ServiceRouter = Router();

ServiceRouter.use(ensureAuthenticated)
ServiceRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

ServiceRouter.post('/create', async (request, response) =>{
    const {
        type,
        price
    } = request.body;
    
    const createServiceService = new CreateServiceService();
    try {
        const service = await createServiceService.execute({
            type,
            price
        })
        return response.status(200).json(service)
    } catch (error) {
        return response.status(400).json('service creation failed')
    }

})


ServiceRouter.get('/list', async (request, response) =>{

    const servicesRepository = new ServicesRepository();

    const services = await servicesRepository.List();

    return response.status(200).json(services)
})




export {ServiceRouter}