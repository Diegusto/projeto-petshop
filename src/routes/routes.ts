import { Router } from "express";

import { userRouter } from "./UserRoutes";

const routes = Router();

routes.use('/users', userRouter)

export default routes;