import { StudentModel } from "../student.model";
import { Student } from "./student.interface";
// amader student interface niye ashlam student: Student diye , good practice for big projects
const createStudentIntoDB = async (student: Student) => {
  // create function diye data create korar function likhechi
  const result = await StudentModel.create(student);
  return result;
  // result return korle controller e chole jabe a
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({
    id,
  });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
