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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleteProduct = await prismaClient.product.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json(deleteProduct);
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaClient.product.findMany({
      where: {
        userId: req.user.id,
      },
    });
    if (!products.length) {
      throw new NotFoundException(
        "No any products listed by you",
        ErrorCode.PRODUCT_NOT_FOUND
      );
    }
    res.json(products);
  } catch (err) {
    throw new NotFoundException(
      "Products not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: 5,
  });
  res.json({
    count,
    data: products,
  });
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

export const deleteCategory = async (req: Request, res: Response) => {
  const category = await prismaClient.category.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ msg: `${category.name} deleted` });
};

export const listCategory = async (req: Request, res: Response) => {
  const categories = await prismaClient.category.findMany();
  res.json(categories);
};

export const createProductComment = async (req: Request, res: Response) => {
  const comment = await prismaClient.productComment.create({
    data: {
      ...req.body,
      productId: +req.params.id,
      userId: req.user!.id,
    },
  });
  res.json(comment);
};

export const updateProductComment = async (req: Request, res: Response) => {
  const comment = await prismaClient.productComment.update({
    where: {
      id: +req.params.commentId,
    },
    data: {
      ...req.body,
    },
  });
  res.json(comment);
};

export const deleteProductComment = async (req: Request, res: Response) => {
  const comment = await prismaClient.productComment.delete({
    where: {
      id: +req.params.commentId,
    },
  });
  res.json({ comment, status: "DELETED" });
};

export const getProductComments = async (req: Request, res: Response) => {
  const count = await prismaClient.productComment.count({
    where: {
      productId: +req.params.id,
    },
  });
  const comments = await prismaClient.productComment.findMany({
    where: {
      productId: +req.params.id,
    },
  });
  res.json({ count, comments });
};
