import { createUser, getUsers } from "../service/user.service";
import { Response, Request } from "express";
import { SignUpUserInput } from "../schema/user.schema";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).send({
      status: "success",
      users,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createUserController = async (
  req: Request<{}, {}, SignUpUserInput["body"]>,
  res: Response
) => {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).send({
      status: "success",
      newUser,
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
