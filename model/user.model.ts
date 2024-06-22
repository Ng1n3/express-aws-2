import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface signUpUserSchema {
  name: string;
  email: string;
  password: string;
}

export interface sigInuserSchema {
  email: string;
  password: string;
}

export interface UserDocument extends signUpUserSchema, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true, immutable: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    const { name, email, _id } = ret;

    return { name, email, _id };
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error.message);
  }
});

userSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model<UserDocument>("users", userSchema);

export default userModel;
