import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { debug } from "console";
import { httpLogger } from "./lib/logger";

const app: Express = express();
app.use(httpLogger)

app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

export const prismaClient = new PrismaClient({
  log: ["query", "error", "info", "warn"],
});

app.use(errorMiddleware);

console.log(PORT);

app.listen(PORT, () => {
  console.log(`App working on PORT ${PORT}`);
});
