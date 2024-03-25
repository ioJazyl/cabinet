import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import patientRoute from "./routes/patientRoutes.js";
import cors from "cors";
const port = process.env.PORT || 2000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/patients", patientRoute);

app.listen(port, () => console.log(`server running on ${port}`));
