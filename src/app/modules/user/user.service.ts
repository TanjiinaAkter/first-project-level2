import config from "../../config";
import { Student } from "../student/student.model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";

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
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }
  // set manually generated id (Academic semester data nicchi props a)
  userData.id = await generateStudentId(admissionSemester);
  // create a user
  const newUser = await User.create(userData);
  // create a student...set id(manually jei id pacchi seta), _id as user...
  //newUser নামের object টা ফাঁকা কিনা check kortese
  if (Object.keys(newUser).length) {
    payLoad.id = newUser.id;
    console.log("student id will be", payLoad.id);
    payLoad.user = newUser._id;
    const newStudent = await Student.create(payLoad);
    // mane hocche user thakle student create kore sei student ke controller e retrn kore dicchi

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
