import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 8061;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//connect the port
app.listen(port, () => {
  console.log("***************************************");
  console.log(`Server Running on port number : ${port}`);
});

//connect the mongodb
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO_DB Connection successfull......!!");
  console.log("***************************************");
});

//user router
import user from "./Routes/User.js";
app.use("/user", user);

//Leave router
import leave from "./Routes/Leaves.js";
app.use("/leave", leave);

//Leave Policy router
import leavePolicy from "./Routes/LeavePolicy.js";
app.use("/policy", leavePolicy);
