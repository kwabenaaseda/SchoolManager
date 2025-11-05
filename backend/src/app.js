import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
  quiet: false,
});
const allowedOrigins =
  process.env.DEV_ENV === "developement"
    ? [
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "http://127.0.0.2:5500",
        "http://localhost:5173",
      ]
    : [
        
      ];
const app = express();

app.use(cors({
    origin:allowedOrigins,
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(express.json())

export default app;
