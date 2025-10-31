import z from "zod";

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: "Academic faculty must be string" }),
  }),
});
export const AcademicValidation = {
  academicFacultyValidationSchema,
};
