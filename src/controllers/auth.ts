import { NextFunction, Request, Response } from "express";
import { SignupSchema } from "../schema/users";
import { prismaClient } from "..";

export const signup = async(req:Request, res: Response, next:NextFunction)=> {
    SignupSchema.parse(req.body)
    const {email, password, name} = req.body

    let user = await prismaClient.user.findFirst({where: {email}})
    if(user) {
        
    }
}