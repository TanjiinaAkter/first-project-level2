import config from "../../config";
import { Student } from "../student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password not given, use default password
  userData.password = password || config.default_password;
  // set student role
  userData.role = "student";
  // set manually generated id
  userData.id = "2030100001";
  // create a user
  const newUser = await User.create(userData);
  // create a student...set id(manually jei id pacchi seta), _id as user
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    // mane hocche user thakle student create kore sei student ke controller e retrn kore dicchi

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
