import { Student } from "../student.model";
import { TStudent } from "./student.interface";
// amader student interface niye ashlam student: Student diye , good practice for big projects
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // ============================================//
//   // --------------  static method(4)   static method--------------
//   // ============================================//
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error("User already exists!");
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
//   //   throw new Error("Student already exists");
//   // }

//   // built-in instance method-step-2 :Saves this document using save() instance property by inserting a new document into the database

//   // const result = await student.save();
//   return result;
//   // result return korle controller e chole jabe a
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({
  //   id,
  // });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
