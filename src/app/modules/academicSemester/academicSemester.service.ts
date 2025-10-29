import { create } from "domain";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";

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
    throw new Error("Invalid semester code");
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
