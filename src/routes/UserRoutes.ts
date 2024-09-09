import { Router } from "express";
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
        ativo,
        password,
        type
    } = request.body;


    //const {id} = request.user

    const usersRepository = new UsersRepository();

    /*const findUser = await usersRepository.FindById(id)
    if (findUser){
        if (!findUser.type.includes('master')){
            if (type.includes('master') || type.includes('admin')){
                throw new AppError('user type invalid')
            }
        }
    }else if (type.includes('master') || type.includes('admin')){
        throw new AppError('user type invalid')
    }*/

    const createUserService = new CreateUserService();

    try {
     
        const user = await createUserService.execute({
            name,
            document,
            email,
            ativo,
            password,
            type
        })

        return response.status(200).json(user)

    } catch (error){
        throw new AppError('user creation failed')
    }


    

})

userRouter.get('/list', async (request, response) =>{
    

    const usersRepository = new UsersRepository();

    const users = await usersRepository.List();

    return response.status(200).json(users)
})

userRouter.post('/delete', async (request, response) =>{
    const {
        document
    } = request.body;



    const usersRepository = new UsersRepository();

    const users = await usersRepository.delete(document);

    return response.status(200).json(users)
})

export {userRouter}