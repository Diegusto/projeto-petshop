import { Router } from "express";

import { userRouter } from "./UserRoutes";
import { loginRouter } from "./LoginRoutes";
import { ProductRouter } from "./ProductsRoutes";
import { SalesRouter } from "./salesRoutes";
import { ServiceRouter } from "./ServicesRoutes";
import { PetRouter } from "./PetsRoutes";
import { AppointmentsRouter } from "./AppointmentsRoutes";
import { FinancesRouter } from "./FinancesRoutes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/login', loginRouter)
routes.use('/products', ProductRouter)
routes.use('/sales', SalesRouter)
routes.use('/services', ServiceRouter)
routes.use('/pets', PetRouter)
routes.use('/appointments', AppointmentsRouter)
routes.use('/finances',FinancesRouter)

export default routes;