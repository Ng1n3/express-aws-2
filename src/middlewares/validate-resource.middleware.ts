import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const formattedErrors = error.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      res.status(400).send({
        status: "Error",
        error: formattedErrors,
      });
    }
  };

export default validateResource;
