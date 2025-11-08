import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleValidationError  = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  const statusCode = 400;
  // Object.values diye err.errors er key na just values nicchi, then proti err.errors.name er under e path ar message nicchi
  const errorSources: TErrorSource = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
