import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.Validation";

const router = express.Router();
router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createacademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.get("/", AcademicFacultyController.getAllAcademicFaculties);
router.get("/:facultyId", AcademicFacultyController.getASingleAcademicFaculty);




router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateacademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);
export const AcademicFacultyRoutes = router;
