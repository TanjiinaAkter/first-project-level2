import Joi from "joi";
// Joi validator library use
 
//localGuardianSchema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "LocalGuardian name is required",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "contactNo is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "address is required",
  }),
});

//guardianSchema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "fatherName is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "fatherOccupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "fatherContactNo is required",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "motherName is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "any.required": "motherOccupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "any.required": "motherContactNo is required",
  }),
});

//userNameSchema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .custom((value, helpers) => {
      const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== firstNameString) {
        return helpers.error("any.invalid", {
          message: `${value} is not in capital form`,
        });
      }
      return value;
    })
    .messages({
      "any.required": "First name is required",
      "string.max": "maxlength for name is 20 characters",
    }),
  middleName: Joi.string().required().messages({
    "any.required": "Middle name is required",
  }),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "any.required": "Last name is required",
      "string.pattern.base": "{#value} is not valid pls check",
    }),
});

//studentSchema  holo Schema instance বা Schema object
export const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    // valid ba allow er khetre .only use hoy
    "any.only": "{#value} is not supported ",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "{#value} is not corrected form ",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "any.required": "Emergency contact number is required",
  }),
  // built-in validation in Joi (enum check for blood group)
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional()
    .messages({
      "any.only": "{#value} is not within the given values",
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid("active", "block").default("active"),
});

// here "Student" ta save hobe DB e collection er nam hishebe
//StudentModel → আসল Model object, যেটা দিয়ে তুমি CRUD করতে পারবে।
// model<Student> এটা একটা function, যেটা Schema কে MongoDB এর collection এর সাথে bind করে।
export default studentValidationSchema;
