import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import User from "./models/user.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

config();

const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is listening on port " + port);
});

(async () => {
  try {
    // set up mongoose
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connection established");

    // set up routes
    app.use("/users", usersRouter);
  } catch (error) {
    console.error(error.message);
  }
})();
