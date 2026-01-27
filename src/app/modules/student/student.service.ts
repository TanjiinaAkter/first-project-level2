import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import status from "http-status";
import { User } from "../user/user.model";
import { object } from "joi";
import { de } from "zod/v4/locales";
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
// ==== ekhane query is for ex:{ searchTerm: 'Dhanmondi' }
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // kon fields diye search korte chai tar array
  const studentsSearchableFields = [
    "email",
    "name.firstName",
    "presentAddress",
  ];
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  // RAW SEARCHING - using only searchTerm
  const searchQuery = Student.find({
    //MongoDB $or operator array of conditions নেয়। যেকোনো condition match হলে document return হবে।
    $or: studentsSearchableFields.map((field) => ({
      // $regex =jeta match korte chai( এখানে email field-এ যে কোনো value যেটাতে "gmail.com" আছে, সেটা match হবে।), i=case-insensitive
      //এখানে or এর জন্য এমন পেতে পারি ,so field এ আমরা যেটা search করবো ঐটা পাবো, মানে fieldname টা আসবে  [field]এখানে
      // $or: [
      //   { email: { $regex: "dhanmondi", $options: "i" } },
      //   { "name.firstName": { $regex: "dhanmondi", $options: "i" } },
      //   { presentAddress: { $regex: "dhanmondi", $options: "i" } }
      // ]
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  const queryObj = { ...query };
  const excludeFields = ["searchTerm", "sort", "page", "limit"];
  excludeFields.forEach((element) => delete queryObj[element]);
  console.log(query, queryObj);
  // FILTERING
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    // ekhane academicDepartment er under a academic faculty so seta populate korte academicDepartment er path e jeye abar populate korbo... mane path mane inside a jabe
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  // SORT

  // -createdAt মানে: নতুন ডাটা আগে দেখাবে,Mongoose-এ যদি schema-তে timestamps: true থাকে, তাহলে অটোমেটিক দুইটা field আসে:createdAt + updatedAt
  let sort = "-createdAt";
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // limiting
  let limit = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  // PAGINATION
  let page = 1;
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = await paginateQuery.limit(limit);
  return limitQuery;
};
const getSingleStudentFromDB = async (id: string) => {
  // findById ditam jodi mongoose er _id diye khujtam kintu amra ekhon custom id use kore kaj korbo tai findOne use korbo
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

// premitive and non -premitive
const updateStudentFromDB = async (
  studentId: string,
  // partial niyechi karon amra sob field update korbo na
  payLoad: Partial<TStudent>,
) => {
  // handle to update non premitive data.. specific properties to be extracted,remain will be kept under remainingStudentData
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;
  // new obj create kortesi jar moddhe only remainingStudentData er property thakbe ar Record<> er kaj hocche key gulo hobe string type ar value unknown..eta na korle hoyto error dite pare
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  // ekhane keys diye condition nicchi karon amra update korbo key like firstname k tai key=firstname ta lagbei
  if (name && Object.keys(name).length) {
    //Object.entries() object-এর প্রতিটা key: value জোড়াকে একটা array বানায় → [key, value]
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedUpdatedData,
    {
      new: true,
      // mongoose jeno arekbar validation k on kore dey
      runValidators: true,
    },
  );

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // session-update...... amader custom id diye delete operation korbo tai findOneAndUpdate use hobe noyto updateOne dilei hoto
    const deletedStudent = await Student.findOneAndUpdate(
      // kake update korchi
      { id },
      // kon field update korchi
      { isDeleted: true },
      // new updated data
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
    throw new AppError(status.BAD_REQUEST, "Failed to delete a student");
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
