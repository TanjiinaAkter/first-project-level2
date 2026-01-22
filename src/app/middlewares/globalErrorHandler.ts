import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values ..status code pacchi amra AppError class theke custom create kore noyto only messgae provide hoto mongoose Error e
  let statusCode = 500;
  let message = "Something went wrong in global error handler middleware";
  // this type is a array type, which each elements will be a obj

  //default errorSouces eita hobe tai let diye pore customize korte parbo..
  // er kaj hocche zod/onnno validation er error gula kothay hocche seta dekhano
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // error ta jodi Zod theke ashe seta pete err JS er instanceof operator use kortesi, err ashche globalErrorHandler middleware er err theke
  if (err instanceof ZodError) {
    // override kortesi zod error handle er jonno,simplified niyechi karon zodErrorHandle function ta niye ashtesi ar seta theke use hobe
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // 11000 ta kono name thake na tai amra 11000 diye duplicate key error handle korbo
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    // statusCode to nai Error er tai default ta jabe ekhane
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    amiiierror: err,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
