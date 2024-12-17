import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import {
  createCategory,
  createProduct,
  updateProduct,
} from "../controllers/products";
import sellerMiddleware from "../middlewares/seller";
import adminMiddleware from "../middlewares/admin";

const productRoutes: Router = Router();

productRoutes.post(
  "/",
  [authMiddleware, sellerMiddleware],
  errorHandler(createProduct)
);

productRoutes.post(
  "/categories",
  [authMiddleware, adminMiddleware],
  errorHandler(createCategory)
);

productRoutes.post(
  "/:id",
  [authMiddleware, sellerMiddleware],
  errorHandler(updateProduct)
);

export default productRoutes;
