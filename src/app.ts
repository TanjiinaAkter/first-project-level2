import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import { StudentRoutes } from "./app/modules/student/student.route";
// import { UserRoutes } from "./app/modules/user/user.route";
import { error } from "console";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
// const port = 3000;

//PARSERS
// amader code undefined ashbe karon parser na thakle dekha jabe na tai .json() use korbo
app.use(express.json());
app.use(cors());

//APPLICATION ROUTES
app.use("/api/v1", router);
// app.use("/api/v1/students", StudentRoutes);
// app.use("/api/v1/users", UserRoutes);
const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get("/", test);
//global error handler
app.use(globalErrorHandler);
// not found
app.use(notFound);
export default app;
