import express from "express";
import userRouter from "../Routes/userRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);

export default app;
