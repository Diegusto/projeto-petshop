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

    try {
     
        const user = await createUserService.execute({
            name,
            document,
            email,
            password,
            type
        })

        return response.status(200).json(user)

    } catch (error) {
        return response.status(400).json(error)
    }


    

})

export {userRouter}