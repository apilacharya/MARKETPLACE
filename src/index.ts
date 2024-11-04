import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import { PORT } from "../secrets";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

export const prismaClient = new PrismaClient();

app.listen(PORT, () => {
  console.log("App working on PORT" + { PORT });
});
