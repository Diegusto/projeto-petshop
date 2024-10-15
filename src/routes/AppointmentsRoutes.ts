import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateAppointmentService} from "../services/CreateAppointmentService";
import { ServicesRepository } from "../repositories/servicesRepository";
import { AppointmentsRepository } from "../repositories/appointmentsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { AppError } from "../error/AppError";

const AppointmentsRouter = Router()

AppointmentsRouter.use(ensureAuthenticated)

AppointmentsRouter.post('/create', async (request, response) =>{
    const {
        funcId,
        petId,
        serviceId,
        

    } = request.body;

    const {id} = request.user

    const usersRepository = new UsersRepository();
    const servicesRepository = new ServicesRepository();
    const findUser = await usersRepository.FindById(id)

    if (!findUser){
        throw new AppError('user not found', 401)
    }

    const createAppointmentService = new CreateAppointmentService();
    try {
        const appointment = await createAppointmentService.execute({
            clientId:id,
            funcId,
            petId,
            serviceId,
            
        })

        return response.status(200).json(appointment)

    } catch (error) {
        throw new AppError('sale creation failed')
    }
   
})

AppointmentsRouter.get('/list', async (request, response) =>{

    const {id} = request.user

    const usersRepository = new UsersRepository();
    const appointmentsRepository = new AppointmentsRepository();

    const findUser = await usersRepository.FindById(id)

    if (!findUser){
        throw new AppError('user not found', 401)
    }
    

    if (!findUser.type.includes('master') && !findUser.type.includes('admin')){
        throw new AppError('user not allowed', 403)
    }

    const appointments = await appointmentsRepository.List();


    return response.status(200).json(appointments)
})

AppointmentsRouter.get('/listUser', async (request, response) =>{

    const {id} = request.user
    
    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.FindById(id)

    if (!findUser){
        throw new AppError('user not found', 401)
    }
    
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.listByUser(id);

    return response.status(200).json(appointments)
})

AppointmentsRouter.post('/listUser', async (request, response) =>{
    const {
        petId
    } = request.body;

    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.listByPet(petId);

    return response.status(200).json(appointments)
})



export {AppointmentsRouter}