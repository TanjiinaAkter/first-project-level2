import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
const router = express.Router();

router.post(
  "/create-student",
  // validation er kaj korbe
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);
// ekhane routes>index.ts e amra user er jonno UserRoutes route hishebe set kore dicchi
export const UserRoutes = router;
