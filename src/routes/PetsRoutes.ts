import { Router } from "express";
import { CreatePetService } from "../services/CreatePetService";
import { PetsRepository } from "../repositories/petsRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UsersRepository } from "../repositories/usersRepository";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AppError } from "../error/AppError";

const PetRouter = Router();

PetRouter.use(ensureAuthenticated)
PetRouter.use(ensureAdmin)

const usersRepository = new UsersRepository();

PetRouter.post('/create', async (request, response) =>{
    const {
        name,
        type
    } = request.body;
    
    const {id} = request.user

    const createPetService = new CreatePetService();
    try {
        const pet = await createPetService.execute({
            userId:id,
            name,
            type
        })
        return response.status(200).json(pet)
    } catch (error) {
        return response.status(400).json('pet creation failed')
    }

})


PetRouter.get('/list', async (request, response) =>{

    const {id} = request.user

    const petsRepository = new PetsRepository();

    const pets = await petsRepository.listByUser(id);

    return response.status(200).json(pets)
})




export {PetRouter}