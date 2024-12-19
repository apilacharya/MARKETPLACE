import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      )
    );
  }

  console.log("middleware called");
  console.log(token);

  try {
    const payload = jwt.verify(token!, JWT_SECRET) as { userId: string };
    const user = await prismaClient.user.findFirst({
      where: {
        id: Number(payload.userId),
      },
    });
    if (!user) {
      next(
        new UnauthorizedException(
          "Unauthorized",
          ErrorCode.UNAUTHORIZED_EXCEPTION
        )
      );
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      )
    );
  }
};

export default authMiddleware;
