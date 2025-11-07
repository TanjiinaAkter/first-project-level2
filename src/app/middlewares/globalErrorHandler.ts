import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong global error";
  // this type is a array type, which each elements will be a obj

  //default errorSouces eita hobe tai let diye pore customize korte parbo
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue) => {
      return {
        path: (issue.path[issue.path.length - 1] ?? "") as string | number,
        message: issue.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: "Validation error",
      errorSources,
    };
  };
  if (err instanceof ZodError) {
    // override kortesi zod error handle er jonno
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    ((message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources));
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
