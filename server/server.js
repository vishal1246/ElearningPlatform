const morgan = require("morgan");
import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
require("dotenv").config();
const app = express();
// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares
app.use(cookieParser());
app.use(cors()); // What is corss
app.use(express.json({ limti: "5mb" }));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
