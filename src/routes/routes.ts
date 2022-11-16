import { Router } from "express";

import { userRouter } from "./UserRoutes";
import { loginRouter } from "./LoginRoutes";
import { ProductRouter } from "./ProductsRoutes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/login', loginRouter)
routes.use('/products', ProductRouter)

export default routes;