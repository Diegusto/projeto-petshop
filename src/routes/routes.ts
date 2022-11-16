import { Router } from "express";

import { userRouter } from "./UserRoutes";
import { loginRouter } from "./LoginRoutes";
import { ProductRouter } from "./ProductsRoutes";
import { SalesRouter } from "./salesRoutes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/login', loginRouter)
routes.use('/products', ProductRouter)
routes.use('/sales', SalesRouter)

export default routes;