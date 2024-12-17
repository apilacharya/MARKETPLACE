import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { NextFunction, Request, Response } from "express";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user!;
  if (user.role == "ADMIN") {
    console.log("came");
    next();
  } else {
    throw new UnauthorizedException(
      "Unauthorized",
      ErrorCode.UNAUTHORIZED_EXCEPTION
    );
  }
};

export default adminMiddleware;
