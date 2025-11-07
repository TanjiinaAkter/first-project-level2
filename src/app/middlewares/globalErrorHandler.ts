import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/validationError";

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

  //default errorSouces eita hobe tai let diye pore customize korte parbo..
  // er kaj hocche zod/onnno validation er error gula dekhano
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // error ta jodi Zod theke ashe seta pete err instanceof use kortesi
  if (err instanceof ZodError) {
    // override kortesi zod error handle er jonno
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    ((message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources));
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    // err,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
