import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppErrors";
import status from "http-status";
import { User } from "../user/user.model";
// amader student interface niye ashlam student: Student diye , good practice for big projects
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // ============================================//
//   // --------------  static method(4)   static method--------------
//   // ============================================//
//   if (await Student.isUserExists(studentData.id)) {
//     throw new AppError("User already exists!");
//   }

//   // create function diye data create korar function likhechi
//   // =================   eta mongoose er built-in static method ================== //
//   const result = await Student.create(studentData); //built-in static method

//   // =================  built-in instance method ================== //
//   // built-in instance method-step-1 : instance create using model class
//   // custom instance method -6 amader custom interface create korbo
//   // const student = new Student(studentData);
//   // custom instance method -7 jodi existed user thake then error dibe (ekhane studenttData.id diyechi karon isUserExistes ekta function)noyto amader banano custom instance ta call kore save() kore dibo ...error msg controller e peete controller e jabo
//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new AppError("Student already exists");
//   // }

//   // built-in instance method-step-2 :Saves this document using save() instance property by inserting a new document into the database

//   // const result = await student.save();
//   return result;
//   // result return korle controller e chole jabe a
// };
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  //option2: const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentFromDB = async (
  studentId: string,
  payLoad: Partial<TStudent>,
) => {
  const result = await Student.findOneAndUpdate({ id: studentId }, payLoad, {
    new: true,
  });

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // session-update...... amader custom id diye delete operation korbo tai findOneAndUpdate use hobe noyto updateOne dilei hoto
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(
        status.BAD_REQUEST,
        "Failed to delete student and user",
      );
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete user and user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
