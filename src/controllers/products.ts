import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { CategorySchema, ProductSchema } from "../schema/products";
import { Request, Response, NextFunction } from "express";

export const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      userId: req.user!.id,
    },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateproduct = req.body;
    const product = await prismaClient.product.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    const user = req.user.id;
    if (product!.userId !== user) {
      throw new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      );
    }
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: +req.params.id,
      },
      data: updateproduct,
    });
    res.json(updatedProduct);
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const createCategory = async (req: Request, res: Response) => {
  CategorySchema.parse(req.body);
  const category = await prismaClient.category.create({
    data: {
      ...req.body,
    },
  });
  res.json(category);
};
