import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import profileRoutes from "./profile";
const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/profile", profileRoutes);

export default rootRouter;
