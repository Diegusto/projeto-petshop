import { Router } from "express";

import { userRouter } from "./UserRoutes";
import { loginRouter } from "./LoginRoutes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/login', loginRouter)

export default routes;