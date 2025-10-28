import { z } from "zod";

// Nested schemas

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  contactNo: z.string().min(1, "Contact number is required"),
  address: z.string().min(1, "Address is required"),
});

// Main Student schema

export const createStudentValidationSchema = z.object({
  // id: z.string().min(1, "ID is required"),
  // -------------- pre and save middleware use (4) pre middleware use korar jonno password add kore niyechi--------------//
  body: z.object({
    password: z.string().max(20, "password is required"),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth:z.coerce.date().optional(),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .pipe(
          z.email({
            message: "Invalid email format (use user@domain.com)",
          }),
        ),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
  // isActive: z.enum(["active", "block"]).default("active"),
  // isDeleted: z.boolean().default(false),
});
export const studentValidations = {
  createStudentValidationSchema,
};
