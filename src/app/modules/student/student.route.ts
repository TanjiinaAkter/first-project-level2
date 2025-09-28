// HANDLING ROUTING

import express from "express";
import { StudentController } from "./student.controller";
// router শুধু বলে দেয় কোন endpoint এ গেলে কী ঘটবে এইটাই router.ts এর কাজ ।
//student-related routes এক জায়গায় রাখতে পারবে eita diye express.Router()
const router = express.Router();
// will call controller function
// client create-student e hit korbe post korar jonno

router.post("/create-student", StudentController.createStudent);
// router nijiei obj so {} er moddhe router export kori nai
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);
export const StudentRoutes = router;
