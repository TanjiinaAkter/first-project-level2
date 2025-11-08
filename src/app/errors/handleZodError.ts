import { ZodError } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  //====================== zod e error.issues ta mainly
  // ZodError: [
  //  issues: {
  //     "expected": "string",
  //     "code": "invalid_type",
  //     "input": 12, //
  //     "path": "",
  //     "message": "Invalid input: expected string, received number"
  //   }
  //======================= ]
  const errorSources: TErrorSource = err.issues.map((issue) => {
    return {
      path: (issue.path[issue.path.length - 1] ?? "") as string | number,
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};
export default handleZodError;
