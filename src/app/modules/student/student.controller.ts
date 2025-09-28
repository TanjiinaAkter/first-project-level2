import { StudentServices } from "./student.service";
import { Request, Response } from "express";
// CREATE STUDENT
const createStudent = async (req: Request, res: Response) => {
  try {
    //jokhn post kortesi oikhane body ache,sei body theke student data niye ashbo
    const { student: studentData } = req.body;
    //will call service function to send this data , kon db use kortese setar jonno service file use hocche
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET ALL STUDENTS
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All Students gets",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId is required" });
    }
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Single student get",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
