import status from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import { Error } from "mongoose";
import AppError from "../../errors/AppError";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department created succesfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Academic department are retrieved succesfully",
    data: result,
  });
});
const getASingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  if (!departmentId) {
    throw new AppError(status.NOT_FOUND, "DEPARTMENT id required");
  }
  const result =
    await AcademicDepartmentServices.getASingleAcademicDepartmentFromDB(
      departmentId,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is retrived succesfully",
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  if (!departmentId) {
    throw new AppError(status.NOT_FOUND, " department id is required");
  }
  const result =
    await AcademicDepartmentServices.updateASingleAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is updated succesfully",
    data: result,
  });
});
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getASingleAcademicDepartment,
  updateAcademicDepartment,
};
