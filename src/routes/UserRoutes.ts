import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserService } from "../services/CreateUserService";
import { UsersRepository } from "../repositories/usersRepository";
import { AppError } from "../error/AppError";
const userRouter = Router();

//userRouter.use(ensureAuthenticated)

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
    if (findUser){
        if (!findUser.type.includes('master')){
            if (type.includes('master') || type.includes('admin')){
                throw new AppError('user type invalid')
            }
        }
    }else if (type.includes('master') || type.includes('admin')){
        throw new AppError('user type invalid')
    }

    console.log("cheguei")
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
        throw new AppError('user creation failed')
    }


    

})

export {userRouter}