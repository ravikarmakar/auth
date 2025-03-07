import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

// MongoDB
import { connectToDB } from "./config/db.js";

// All Routes
import authRouter from "./router/auth.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  connectToDB(); // calling db here
});
