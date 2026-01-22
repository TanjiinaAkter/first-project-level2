import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  // direct amiierror.path eivabe e peye jacchi tai map lagbe na array of obj korlei hobe
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: "Invalid ID, Cast Validation Error",
    errorSources,
  };
};
export default handleCastError;
