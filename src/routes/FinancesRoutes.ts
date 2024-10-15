import { Router } from "express";
import { CreateFinancesService } from "../services/CreateFinancesService";
import { FinancesRepository } from "../repositories/financesRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { SalesRepository } from "../repositories/salesRepository";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";
import { AppointmentsRepository } from "../repositories/appointmentsRepository";
import { ServicesRepository } from "../repositories/servicesRepository";

const FinancesRouter = Router();

FinancesRouter.use(ensureAuthenticated)
FinancesRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

FinancesRouter.post('/create', async (request, response) =>{
    const {
        Value,
        date,
        description
    } = request.body;
    
    const {id} = request.user

    const createFinancesService = new CreateFinancesService();
    try {
        const finance = await createFinancesService.execute({
            Value,
            date,
            description
        })
        return response.status(200).json(finance)
    } catch (error) {
        return response.status(400).json('finance creation failed')
    }

})


FinancesRouter.post('/list', async (request, response) =>{
    const {
        date1,
        date2
    } = request.body

    const financesRepository = new FinancesRepository();

    const finances = await financesRepository.listByDate(date1,date2);

    return response.status(200).json(finances)
})

FinancesRouter.post('/relatory', async (request, response) =>{
    const {
        date1,
        date2
    } = request.body

    const financesRepository = new FinancesRepository();
    const salesRepository = new SalesRepository();
    const appointmentsRepository = new AppointmentsRepository();

    const finances = await financesRepository.listByDate(date1,date2);
    const sales = await salesRepository.ListByMonth(date1,date1);
    const appointments = await appointmentsRepository.listByMonth(date1,date2);

    let productGains = 0;
    let servicesGains = 0;
    let totalLoss = 0;

    for (let i = 0; i < finances.length; i++ ){
        totalLoss += finances[i].Value;
    }
    for (let i = 0; i < sales.length; i++){
        productGains += sales[i].totalValue;
    }

    for (let i = 0; i < sales.length; i++){
        servicesGains += appointments[i].price;
    }
    let totalValue = productGains + servicesGains - totalLoss;

    let relatory= [
        finances,
        totalLoss,
        sales,
        productGains,
        appointments,
        servicesGains,
        totalValue
    ]

    return response.status(200).json(relatory);
})

FinancesRouter.post('/sales', async (request, response) =>{
    const {
        date1,
        date2
    } = request.body

    const salesRepository = new SalesRepository();

    const finances = await salesRepository.ListByMonth(date1,date2);

    return response.status(200).json(finances)
})

FinancesRouter.post('/services', async (request, response) =>{
    const {
        date1,
        date2
    } = request.body

    const appointmentsRepository = new AppointmentsRepository();

    const finances = await appointmentsRepository.listByMonth(date1,date2);

    return response.status(200).json(finances)
})


export {FinancesRouter}