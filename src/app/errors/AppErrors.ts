import { Error } from "mongoose";
// amra Error er moddhe custom error AppError ke use kortesi
class AppError extends Error {
  // custom stadtusCode property create kore nicchi jetay custom error er HTTP status rakhbe
  public statusCode: number;
  //contructor(mane gothon kora custom function ta maybe) er kaj hocche jokhn notun AppError cholbe tokhn ei ei property thakbe......... amader custom AppError er moddhe statusCode,message,stack thakbe
  constructor(statusCode: number, message: string, stack = "") {
    // message ta amra Error er theke pawa msg ta use korbo
    super(message);
    //custom stadtusCode aboshbe  present statusCode ta
    this.statusCode = statusCode;
    // kothay error hocche seta stack e set korchi
    if (stack) {
      this.stack = stack;
    } else {
      // stack na thakle Error nije ber korbe kothay error
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
