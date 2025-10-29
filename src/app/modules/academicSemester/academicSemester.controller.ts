import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Semester is created successfully",
    data: result,
  });
});
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Academic semester data retrieved",
    data: result,
  });
});
const getASingleSemester = catchAsync(async (req, res) => {
  const semesterid = req.params.semesterId as string;

  const result =
    await AcademicSemesterServices.getASigleSemesterFromDB(semesterid);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Single semesester get by id",
    data: result,
  });
});
const updateASingleSemester = catchAsync(async (req, res) => {
  const semesterid = req.params.semesterId as string;
  const updatedDoc = req.body;
  const result = await AcademicSemesterServices.updateASingleSemesterInDB(
    semesterid,
    updatedDoc,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Single semester updated successfully",
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getASingleSemester,
  updateASingleSemester,
};
