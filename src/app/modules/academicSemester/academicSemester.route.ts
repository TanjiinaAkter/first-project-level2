import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);
router.get(
  "/:semesterId",
  AcademicSemesterControllers.getASingleAcademicSemester,
);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateASingleSemester,
);
export const AcademicSemesterRoutes = router;
