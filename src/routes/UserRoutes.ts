import { Router } from "express";
import { CreateUserService } from "../services/CreateUserService";

const userRouter = Router();

userRouter.post('/', async (request, response)=>{
    const {
        name,
        document,
        email,
        password,
        type
    } = request.body;

    const createUserService = new CreateUserService();

   const user = createUserService.execute({
        name,
        document,
        email,
        password,
        type
    })

    return response.status(200).json(user)

})

export {userRouter}