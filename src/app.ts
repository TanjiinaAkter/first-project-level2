import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
// const port = 3000;

//PARSERS
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  let b;
  const a = 10;
  res.send(a);
});
export default app;
