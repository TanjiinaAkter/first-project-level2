import { NextFunction, Request, RequestHandler, Response } from "express";
import status from "http-status";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  //send response

  // res.status(200).json({
  //   success: true,
  //   message: "Student is created successfully",
  //   data: result,
  // });

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Student created successfully",
    data: result,
  });
});
export const UserController = {
  createStudent,
};
