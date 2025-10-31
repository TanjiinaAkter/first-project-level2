import z from "zod";

const createacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
const updateacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
export const AcademicFacultyValidation = {
  createacademicFacultyValidationSchema,
  updateacademicFacultyValidationSchema,
};
