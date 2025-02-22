import express from "express";
import cors from "cors";
import { json } from "body-parser";
import errorHandler from "./app/middlewares/error-handler";
import { appRouter } from "./app/routes";
import { CustomError } from "./app/utils/custom-error";

const app = express();
console.log(process.env.CLIENT_URL)
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true,
  }));
  app.use(express.json()); // Must be before your routes
  app.use(express.urlencoded({ extended: true })); // Handles form data

app.use("/api/v1", appRouter);

app.all("*",()=>{
    throw new CustomError("Not found", 404);
})

app.use(errorHandler)

export { app };