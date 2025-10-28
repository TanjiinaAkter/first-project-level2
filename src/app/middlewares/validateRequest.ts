import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

// validation just middleware hishebe kaj kortese tai req,res,nect diye function hocche and alada const var e niyechi karon  re-use korar jonno...schema parameter e amra controller er moddhe studentzod validation ta diye validation obj dicchi
const validateRequest = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      // MUST ADD NEXT AS IT IS A MIDDLEWARE
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
