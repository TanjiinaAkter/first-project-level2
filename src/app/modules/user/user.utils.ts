import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// dynamically generate student id (year+code+4digit=====================2030100001) tai academic semester ekhane lagbe ,student.admissionSemester e ref id nibo
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // last student thakle sei id ta , ar na thkle first time "0"
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  console.log(incrementId);
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
