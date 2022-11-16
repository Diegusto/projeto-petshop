import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserService } from "../services/CreateUserService";
import { UsersRepository } from "../repositories/usersRepository";
const userRouter = Router();

userRouter.use(ensureAuthenticated)

userRouter.post('/', async (request, response)=>{
    const {
        name,
        document,
        email,
        password,
        type
    } = request.body;


    const {id} = request.user

    const usersRepository = new UsersRepository();

    const findUser = await usersRepository.FindById(id)
    if (!findUser){
        throw new Error('user not found')
    }

    if (!findUser.type.includes('master')){
        if (type.includes('master') || type.includes('admin')){
            throw new Error('user type invalid')
        }
    }

    const createUserService = new CreateUserService();

    try {
     
        const user = await createUserService.execute({
            name,
            document,
            email,
            password,
            type
        })

        return response.status(200).json(user)

    } catch (error){
        return response.status(400).json('user creation failed')
    }


    

})

export {userRouter}