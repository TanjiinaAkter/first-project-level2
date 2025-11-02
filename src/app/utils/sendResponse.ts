import { Response } from "express";
// <T> holoplaceholder for a type mane data:T holo ei jaygay jekono data hote pare like T হবে number/string/object/array
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  // data:T holo ei jaygay jekono data hote pare like T হবে number/string/object/array
  data: T;
};
//TResponse<T> type ta  kaj korte just T dorkar,
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
export default sendResponse;
