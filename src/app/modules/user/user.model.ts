import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bycript from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: [true, "id is needed"] },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
// -------------- pre and save middleware use (1) will work on create() or save()--------------//
//pre hook
userSchema.pre("save", async function (next) {
  console.log(
    this,
    "pre hook :we will save tha data before that pre middleware function will work",
  );
  const user = this;
  // -------------- pre and save middleware use (8) bycript pass from .env. and safe as user password, must nect() dite hobe karon middleware
  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
  next();
});
//post hook --doc hocche amader updated document ta mane amder send kora data ta
userSchema.post("save", function (doc, next) {
  console.log(
    this,
    "after we saved our  post data on DB , post middleware/hooks will work",
  );
  // password save korar por seta empty kore dicchi এইটা postman মানে user password তা “ ” পাবে কিন্তু DB তে hash password save হবে
  doc.password = "";
  next();
});
export const User = model<TUser>("User", userSchema);
