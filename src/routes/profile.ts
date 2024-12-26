import { errorHandler } from "./../error-handler";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import {
  createReview,
  editReview,
  getAllReviewsOfBuyer,
  getAllReviewsofSeller,
  deleteReview,
} from "../controllers/profile";

const profileRoutes: Router = Router();

profileRoutes.post(
  "/reviews/:sellerId",
  [authMiddleware],
  errorHandler(createReview)
);

profileRoutes.get(
  "/reviews/seller/:sellerId",
  [authMiddleware],
  errorHandler(getAllReviewsofSeller)
);

profileRoutes.get(
  "/reviews/buyer",
  [authMiddleware],
  errorHandler(getAllReviewsOfBuyer)
);

profileRoutes.put("/reviews/:id", [authMiddleware], errorHandler(editReview));

profileRoutes.delete(
  "/reviews/:id",
  [authMiddleware],
  errorHandler(deleteReview)
);

export default profileRoutes;
