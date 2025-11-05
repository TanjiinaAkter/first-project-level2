// HANDLING ROUTING

import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
// router শুধু বলে দেয় কোন endpoint এ গেলে কী ঘটবে এইটাই router.ts এর কাজ ।
//student-related routes এক জায়গায় রাখতে পারবে eita diye express.Router()
const router = express.Router();
// will call controller function
// client create-student e hit korbe post korar jonno
//========= create student post req is transfered to the user route =========//
// router.post("/create-student", StudentController.createStudent);
// router nijiei obj so {} er moddhe router export kori nai
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateSingleStudent,
);
router.delete("/:studentId", StudentController.deleteStudent);
export const StudentRoutes = router;
