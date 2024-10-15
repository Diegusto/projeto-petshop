import { AppError } from "../error/AppError";
import { AppointmentsRepository } from "../repositories/appointmentsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { ServicesRepository } from "../repositories/servicesRepository";

interface Request{
    clientId: string,
    funcId: string,
    petId: number,
    serviceId: number,
}

interface Response {
    id: number,
    funcId: string,
    clientId: string,
    petId: number,
    serviceId: number,
    price: number,
    date: Date
}

class CreateAppointmentService{
    public async execute({
        clientId,
        funcId,
        petId,
        serviceId,
    }: Request): Promise<Response> {

        const date = new Date(new Date().setDate(new Date().getDate()+7));

        const appointmentsRepository = new AppointmentsRepository();
        const usersRepository = new UsersRepository();
        const servicesRepository = new ServicesRepository();


        const FindService = await servicesRepository.FindById(serviceId);
        if (!FindService){
            throw new AppError('service not found')
        }
        const price = FindService.price

        const appointment = await appointmentsRepository.create({
            funcId,
            clientId,
            petId,
            serviceId,
            price,
            date
        })
        return appointment
    }
}

export {CreateAppointmentService}