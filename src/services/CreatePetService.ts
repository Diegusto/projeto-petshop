import { PetsRepository } from "../repositories/petsRepository";

interface Request{
    userId: string,
    name: string,
    type: string
}

interface Response {
    id: number,
    userId: string,
    name: string,
    type: string
}

class CreatePetService{
    public async execute({
        userId,
        name,
        type
    }: Request): Promise<Response> {
        const petsRepository = new PetsRepository();
        const pet = await petsRepository.create({
            userId,
            name,
            type
        })
        return pet
    }
}

export {CreatePetService}