import userModel, { signUpUserSchema } from "../model/user.model";

export const getUsers = async () => {
  const users = await userModel.find();
  return users;
};

export const createUser = async (input: signUpUserSchema) => {
  const userCheck = await userModel.findOne({ email: input.email });
  if (userCheck) throw new Error("user exists, login or signup with new email");
  try {
    const newUser = await userModel.create(input);
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
