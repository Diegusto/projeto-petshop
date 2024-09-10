import { ServicesRepository } from "../repositories/servicesRepository";

interface Request{
    type:string,
    price:number
}

interface Response {
    id: number,
    type:string,
    price:number
}

class CreateServiceService{
    public async execute({
        type,
        price
    }: Request): Promise<Response> {
        const servicesRepository = new ServicesRepository();
        const service = await servicesRepository.create({
            type,
            price
        })
        return service
    }
}

export {CreateServiceService}