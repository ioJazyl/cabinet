import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    age: { type: String, required: false },
    diagnostic: { type: String, required: true },
    observation: { type: String, required: true },
    telephone: { type: String, required: false },
    dEnter: { type: String, default: null },
    dExit: { type: String, default: null },
    dOperation: { type: String, default: null },
    payment: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
