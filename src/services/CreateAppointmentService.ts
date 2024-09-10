import { AppError } from "../error/AppError";
import { AppointmentsRepository } from "../repositories/appointmentsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { ServicesRepository } from "../repositories/servicesRepository";

interface Request{
    clientId: string,
    petId: number,
    serviceId: number,
    date: Date
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
        petId,
        serviceId,
        date
    }: Request): Promise<Response> {

        const appointmentsRepository = new AppointmentsRepository();
        const usersRepository = new UsersRepository();
        const servicesRepository = new ServicesRepository();

        const FindUser = await usersRepository.FindByType("func");
        if (!FindUser){
            throw new AppError('no worker found')
        }
        const funcId = FindUser.id

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