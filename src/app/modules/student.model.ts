import { Schema, model } from "mongoose";
// -------------- pre and save middleware use (5) password hash kore use korar jonno bycript import add kore niyechi--------------//
import bycript from "bcrypt";
import {
  TStudent,
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TUserName,
} from "./student/student.interface";
import config from "../config";

// Step 2: Create Schema

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String }, // 💡 Ensure 'required: false' is NOT explicitly set, or omitted entirely for optionality
  lastName: { type: String, required: true },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});
// custom instance method -3 interface er methods gula import kore ekhane dibo
// ============================================//
// --------------  static method(2)  import StudentModel--------------
// ============================================//
const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    // -------------- pre and save middleware use (3) pre middleware use korar jonno password add kore niyechi--------------//
    password: {
      type: String,
      required: true,
      maxlength: [30, "pasword can npt be more than 20 characters"],
    },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: false,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    localGuardian: { type: LocalGuardianSchema, required: true },
    profileImg: { type: String, required: false },
    isActive: { type: String, enum: ["active", "block"], required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// -------------- pre and save middleware use (1) will work on create() or save()--------------//
//pre hook
StudentSchema.pre("save", async function (next) {
  console.log(
    this,
    "pre hook :we will save tha data before that pre middleware function will work",
  );
  const user = this;
  // -------------- pre and save middleware use (8) bycript pass from .env. and safe as user password, must nect() dite hobe karon middleware
  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
  next();
});
//post hook --doc hocche amader updated document ta mane amder send kora data ta
StudentSchema.post("save", function (doc, next) {
  console.log(
    this,
    "after we saved our  post data on DB , post middleware/hooks will work",
  );
  // password save korar por seta empty kore dicchi এইটা postman মানে user password তা “ ” পাবে কিন্তু DB তে hash password save হবে
  doc.password = "";
  next();
});
// QUERY MIDDLEWARE -1
StudentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// QUERY MIDDLEWARE -2
StudentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// QUERY MIDDLEWARE -3 aggregate
StudentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true } },
  });
  next();
});

// custom instance method -4 oije isUserExists declare kore disilam seta ei file e likhe dibo,kheyal rakhte hobe method na methods. dibo....sathe interface.ts a Promise a (| null) add kore ashte hobe

// StudentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// ============================================//
// --------------  static method(3)  creating a custom static method--------------
// ============================================//
StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// VIRTUAL
StudentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Step 3: Create Model
// custom instance method -5 ekhnane amra StudentModel ta send korre dibo..bakita service.ts a kaj
export const Student = model<TStudent, StudentModel>("Student", StudentSchema);
