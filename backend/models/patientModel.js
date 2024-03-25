import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    diagnostic: { type: String, required: true },
    telephone: { type: String, required: false },
    dEnter: { type: String, default: "/" },
    dExit: { type: String, default: "/" },
    dOperation: { type: String, default: "/" },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;