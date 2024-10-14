import { appointments,PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IAppointments{
    funcId: string,
    clientId:string,
    petId:number,
    serviceId:number,
    price:number,
    date: Date,

}

class AppointmentsRepository {
    public async create ({
        funcId,
        clientId,
        petId,
        serviceId,
        price,
        date
    }: IAppointments): Promise<appointments> {
        const appointment = await prisma.appointments.create({
            data:{
                funcId,
                clientId,
                petId,
                serviceId,
                price,
                date
            }
        })
        return appointment
    }


    public async FindById (id:number): Promise<appointments | null>{
        console.log(id)
        const appointment =await prisma.appointments.findFirst({
            where:{
                id
            }
        })
        return appointment
    }

    public async List (): Promise<appointments[]>{
        const appointments = await prisma.appointments.findMany({
            orderBy:{
                id: 'desc'
            }
        })

        return appointments
    }

    public async listByUser(clientId:string): Promise<appointments[]>{
        const appointments = await prisma.appointments.findMany({
            where:{
                clientId
            }
        })
        return appointments
    }

    public async listByPet(petId:number): Promise<appointments[]>{
        const appointments = await prisma.appointments.findMany({
            where:{
                petId
            }
        })
        return appointments
    }

}

export {AppointmentsRepository}