import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import sendResponse from "../../utils/sendResponse";
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
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
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createStudent,
};
