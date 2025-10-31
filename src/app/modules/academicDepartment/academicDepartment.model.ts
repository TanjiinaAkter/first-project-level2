import { model, Schema } from "mongoose";
import { TAcademicDepertment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepertment>(
  {
    name: { type: String, unique: true, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      // required: true,
      // unique: true,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAcademicDepertment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
