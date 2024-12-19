import {
  deleteCategory,
  getProductById,
  listCategory,
  listProducts,
  createCategory,
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./../controllers/products";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";

import sellerMiddleware from "../middlewares/seller";
import adminMiddleware from "../middlewares/admin";

const productRoutes: Router = Router();

productRoutes.post(
  "/",
  [authMiddleware, sellerMiddleware],
  errorHandler(createProduct)
);

productRoutes.post(
  "/:id",
  [authMiddleware, sellerMiddleware],
  errorHandler(updateProduct)
);

productRoutes.get(
  "/user",
  [authMiddleware, sellerMiddleware],
  errorHandler(getProducts)
);

productRoutes.get("/category", errorHandler(listCategory));

productRoutes.get("/:id", errorHandler(getProductById));

productRoutes.get("/", errorHandler(listProducts));

productRoutes.delete(
  "/:id",
  [authMiddleware, sellerMiddleware],
  errorHandler(deleteProduct)
);

productRoutes.post(
  "/category",
  [authMiddleware, adminMiddleware],
  errorHandler(createCategory)
);

productRoutes.delete(
  "/category/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteCategory)
);

export default productRoutes;
