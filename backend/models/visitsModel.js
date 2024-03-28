import mongoose from "mongoose";

const visitsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    observation: { type: String },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitsSchema);

export default Visit;