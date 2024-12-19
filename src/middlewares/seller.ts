import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { NextFunction, Request, Response } from "express";

const sellerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user!;
  if (user.role == "SELLER") {
    next();
  } else {
    new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION);
  }
};

export default sellerMiddleware;
