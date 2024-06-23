import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connect from "./util/connect";
import userRouter from "./routes/user.router";

dotenv.config();
const app: Application = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  connect();
  console.log(`listening on http://localhost:${PORT}`);
});

