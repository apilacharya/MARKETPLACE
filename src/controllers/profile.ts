import { Request, Response } from "express";
import { prismaClient } from "..";
import { ReviewSchema } from "../schema/profile";

export const createReview = async (req: Request, res: Response) => {
  ReviewSchema.parse(req.body);
  console.log(req.body);

  const review = await prismaClient.review.create({
    data: {
      rating: req.body.rating,
      description: req.body.description,
      buyer: {
        connect: { id: req.user.id },
      },
      seller: {
        connect: { id: +req.params.sellerId },
      },
    },
    include: {
      buyer: {
        select: {
          id: true,
          name: true,
        },
      },
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.json(review);
};

export const getAllReviewsofSeller = async (req: Request, res: Response) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      sellerId: +req.params.id,
    },
  });
  res.json(reviews);
};

export const getAllReviewsOfBuyer = async (req: Request, res: Response) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      buyerId: req.user.id,
    },
  });
  res.json(reviews);
};

export const editReview = async (req: Request, res: Response) => {
  ReviewSchema.parse(req.body);
  const review = await prismaClient.review.update({
    where: { id: +req.params.id },
    data: req.body,
  });
  res.json(review);
};

export const deleteReview = async (req: Request, res: Response) => {
  await prismaClient.review.delete({
    where: { id: +req.params.id },
  });
  res.json({ message: "Review deleted" });
};
