import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";
import status from "http-status";
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic Faculty created succesfully",
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semesters are retieved successfully",
    data: result,
  });
});
const getASingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  if (!facultyId) {
    throw new Error("Faculty ID is required");
  }
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic single faculty is retrived",
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  if (!facultyId) {
    throw new Error("Faculty ID is required");
  }
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Academic single faculty is updated",
    data: result,
  });
});
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getASingleAcademicFaculty,
  updateAcademicFaculty,
};
