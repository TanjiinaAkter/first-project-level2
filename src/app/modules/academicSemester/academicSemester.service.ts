import { create } from "domain";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import status from "http-status";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  // service.ts er code eita::: defining semester code before creating to avoid duplicate insert of semester
  // type define (type alias)
  // type TAcademicSemesterCodeMapper = {
  //   [key: string]: string;
  // };
  // const academicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
  //   Autumn: "01",
  //   Summer: "02",
  //   Fall: "03",
  // };
  // ekhane mapping object TAcademicSemesterCodeMapper theke amar req data payLoad.name jmn Autumn,Autumn er code ta mapping obj theke niye req code compare kortesi
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new AppError(status.NOT_FOUND, "Invalid semester code");
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getASigleSemesterFromDB = async (semesterid: string) => {
  const result = await AcademicSemester.findById(semesterid);
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Semester id not found");
  }
  return result;
};
const updateASingleSemesterInDB = async (
  semesterid: string,
  updatedDoc: Partial<TAcademicSemester>,
) => {
  if (
    updatedDoc.name &&
    updatedDoc.code &&
    academicSemesterNameCodeMapper[updatedDoc.name] !== updatedDoc.code
  ) {
    throw new AppError(status.NOT_FOUND, "Semester not found with this ID");
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    // direct internally _id diye ber kore
    semesterid,
    updatedDoc,
    { new: true },
  );

  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getASigleSemesterFromDB,
  updateASingleSemesterInDB,
};
