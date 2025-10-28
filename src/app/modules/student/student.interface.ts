import { Schema, model, connect, Model, Types } from "mongoose";

// step:1 create interface

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
// select kore fn+F2 tahole rename hobe
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  // type hocche objectid type..kivabe bujhchi kar _id?? user service e user er id ta student.user e set kore dibo
  user: Types.ObjectId;
  // -------------- pre and save middleware use (2) pre middleware use korar jonno password add kore niyechi--------------//
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
};

// step:2 create Schema
// ========= step-3 custom instance method er steps

// ========= custom instance method -1 (ekhane amra amader nijeder custom function name diye dicchi , logic ta add korbo pore)
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// custom instance method -2  Create a new Model type that knows about IUserMethods...
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// ============================================//
// --------------  static method(1) --------------
// ============================================//
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
