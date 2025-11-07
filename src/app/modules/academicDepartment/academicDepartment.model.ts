import { model, Schema } from "mongoose";
import { TAcademicDepertment } from "./academicDepartment.interface";
import AppError from "../../errors/AppErrors";
import status from "http-status";
import mongoose from "mongoose";
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
// Checking if same department exists by name (before create department)
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentNameExists = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentNameExists) {
    throw new AppError(status.NOT_FOUND, "department is already exists");
  }
  next();
});
// Checking if department id doesn't exists (before updating a department)
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  console.log(query);
  let id = query._id;

  //  Handle nested case
  if (id && typeof id === "object" && id._id) {
    id = id._id;
  }

  //  Validate ObjectId format
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(status.BAD_REQUEST, "Invalid department ID format");
  }

  //  Check if department exists
  const isExists = await AcademicDepartment.findOne({ _id: id });
  if (!isExists) {
    throw new AppError(status.NOT_FOUND, "Department ID does not exist");
  }

  next();
});

// academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
//   //getting the id from data to be updated
//   const query = this.getQuery();
//   const isExists = await AcademicDepartment.findOne(query);
//   if (!isExists) {
//     throw new AppError(status.NOT_FOUND, "department ID is not exists");
//   }
//   next();
// });
export const AcademicDepartment = model<TAcademicDepertment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
