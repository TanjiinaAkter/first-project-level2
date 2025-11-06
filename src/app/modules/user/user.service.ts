import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppErrors";
import status from "http-status";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // user obj create korar jonno partially jei property value lagbe seta get korte use hocche Partial
  const userData: Partial<TUser> = {};
  // if password not given, use default password
  userData.password = password || config.default_password;
  // set student role because this function is for only create a new student
  userData.role = "student";

  // find academic semester from the create student req and create id for student from that
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );
  // isolated environment session create
  const session = await mongoose.startSession();
  if (!admissionSemester) {
    throw new AppError(status.NOT_FOUND, "Admission semester not found");
  }
  try {
    // transaction start korlam
    session.startTransaction();
    // set manually generated id (Academic semester data nicchi props a)
    userData.id = await generateStudentId(admissionSemester);
    // create a user -- transaction-1 (transaction start hoye gelo)
    const newUser = await User.create([userData], { session });
    // create a student. -- transaction-2..set id(manually jei id pacchi seta), _id as user...
    //newUser নামের object টা ফাঁকা কিনা check kortese
    if (!newUser.length || !newUser[0]) {
      throw new AppError(status.BAD_REQUEST, "fail to create user");
    }
    payLoad.id = newUser[0].id;
    console.log("student id will be", payLoad.id);
    payLoad.user = newUser[0]._id;
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent) {
      throw new AppError(status.BAD_REQUEST, "failed to create student");
    }
    // mane hocche user thakle student create kore sei student ke controller e retrn kore dicchi
    // commit session
    await session.commitTransaction();
    // end session
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, "Failed to create a userStudent");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
