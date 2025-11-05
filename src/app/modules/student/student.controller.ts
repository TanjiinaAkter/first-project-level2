import { StudentServices } from "./student.service";
import { NextFunction, Request, RequestHandler, Response } from "express";
// ========== ZOD =========== STEP-1 import zod
import * as z from "zod";
// import { studentValidationSchema } from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { catchAsync } from "../../utils/catchAsync";
//========= step-1 joi validator nilam ========
// import Joi from "joi";
//======== step-2 joi validation library use kore sei file import korlam ========
// import studentValidationSchema from "./student.validation";
// CREATE STUDENT
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // // Joi validator library use
//     // const JoiValidationSchema = Joi.object({
//     //   id: Joi.string(),
//     //   name: {
//     //     firstName: Joi.string().max(20).required(),
//     //     middleName: Joi.string().max(20),
//     //     lastName: Joi.string().max(20),
//     //   },
//     //   gender: Joi.string().required().valid(["male", "female", "other"]),
//     // });

//     //jokhn post kortesi oikhane body ache,sei body theke student data niye ashbo
//     const { student: studentData } = req.body;
//     // ========== ZOD =========== STEP-2 import korbo main const var data  zod validation file theke validation check korte
//     const zodParseData = studentValidationSchema.parse(studentData);

//     //will call service function to send this data , kon db use kortese setar jonno service file use hocche
//     // ======== step-3 validation check korlam ========
//     // const { error, value } = studentValidationSchema.validate(studentData);
//     // ======== step-4 error thakle dekhabo ========
//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: "something wewnt wrong",
//     //     error: error.details,
//     //   });
//     // }
//     //========  step-5 error na thakle student create korbo data diye ========

//     // ========== ZOD =========== STEP-3 then create korte pathiye dibo
//     const result = await StudentServices.createStudentIntoDB(zodParseData);
//     //send response

//     res.status(200).json({
//       success: true,
//       message: "Student is created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       // custom instance method -8 error message or hishebe set korlam
//       message: error.message || "something went wrong",
//       error: error,
//     });
//   }
// };
// GET ALL STUDENTS

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "All Students retrieved successfully",
    data: result,
  });
});
// GET single STUDENT
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res
      .status(400)
      .json({ success: false, message: "studentId is required" });
  }
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Single student get",
    data: result,
  });
});
// delete a single STUDENT
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res
      .status(400)
      .json({ success: false, message: "studentId is required" });
  }
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Student is deleted succesfully",
    data: result,
  });
});
export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
