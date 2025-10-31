import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// dynamically generate student id (year+code+4digit=====================2030100001) tai academic semester ekhane lagbe ,student.admissionSemester e ref id nibo
const findLastStudentId = async () => {
  // last j ""student"" user create hoyeche take id +role diye ber kore anchi
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
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // last student thakle sei id ta , ar na thkle first time "0"
  // last  digit 0 (starting 0 diye)
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payLoad.code;
  const currentSemesterYear = payLoad.year;
  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    // last student er 0001 thakle last 4 digit e seta niye nilam fole current id hoye jabe 0001....6 diyechi karon 6 er porer sob dorkar tai age/pore kichu deinai
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  console.log(incrementId);
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};
