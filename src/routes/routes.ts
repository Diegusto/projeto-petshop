import { Router } from "express";

import { userRouter } from "./UserRoutes";
import { loginRouter } from "./LoginRoutes";
import { ProductRouter } from "./ProductsRoutes";
import { SalesRouter } from "./salesRoutes";
import { ServiceRouter } from "./ServicesRoutes";
import { PetRouter } from "./PetsRoutes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/login', loginRouter)
routes.use('/products', ProductRouter)
routes.use('/sales', SalesRouter)
routes.use('/services', ServiceRouter)
routes.use('/pets', PetRouter)

export default routes;