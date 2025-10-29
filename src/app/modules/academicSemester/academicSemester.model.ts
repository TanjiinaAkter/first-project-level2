import { model, Schema } from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademinSemesterName,
  TMonths,
} from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  year: { type: String, required: true },
  code: { type: String, required: true, enum: AcademicSemesterCode },
  startMonth: { type: String, enum: Months, required: true },
  endMonth: { type: String, enum: Months, required: true },
});
// checking before creating a semester exists or not
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error("Semester year and name is already exists");
  } else {
    next();
  }
});
export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
