import { Request, Response } from "express";
import { prismaClient } from "..";
import { ReviewSchema } from "../schema/profile";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCode } from "../exceptions/root";
import { Cloudinary, getCloudinaryUrl } from "../lib/cloudinary";

dotenv.config();

const randomImageName = (bytes = 32) => crypto.randomBytes(16).toString("hex");

// if (
//   !process.env.BUCKET_NAME ||
//   !process.env.BUCKET_REGION ||
//   !process.env.ACCESS_KEY ||
//   !process.env.SECRET_ACCESS_KEY
// ) {
//   throw new Error("Missing required AWS credentials in environment variables");
// }

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
//   region: bucketRegion,
// });

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

export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const result = await Cloudinary.upload(req.file?.path!);

    const profileImage = await prismaClient.profileImage.create({
      data: {
        userId: req.user.id,
        imageId: result.public_id,
      },
    });
    res.json({
      profileImage,
    });
  } catch (error) {
    throw new InternalException(
      "Error uploading image or server down",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const getProfileImage = async (req: Request, res: Response) => {
  const profileImage = await prismaClient.profileImage.findFirstOrThrow({
    where: {
      userId: +req.params.userId,
    },
  });
  const imageURL = getCloudinaryUrl(`${profileImage.imageId}`);
  res.json({ imageURL: imageURL });
};

export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const result = await Cloudinary.upload(req.file?.path!);
    const profileImage = await prismaClient.profileImage.update({
      where: {
        userId: req.user.id,
      },
      data: {
        userId: req.user.id,
        imageId: result.public_id,
      },
    });
    res.json({
      profileImage,
    });
  } catch (error) {
    throw new InternalException(
      "Error updating image or server down",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};
