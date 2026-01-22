import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();
router.post(
  "/create-academic-department",
  // mongoose validation error check by commenting validateRequest
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get("/", AcademicDepartmentController.getAllAcademicDepartments);
router.get(
  "/:departmentId",
  AcademicDepartmentController.getASingleAcademicDepartment,
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);
export const AcademicDepartmentRoutes = router;
