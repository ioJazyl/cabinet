import express from "express";
import {
  addPatient,
  getPatients,
  getPatientById,
  deletePatientById,
  deletePatientByBody,
} from "../controllers/patientController.js";

const router = express.Router();
router.post("/new", addPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatientById);
router.post("/delete", deletePatientByBody);

export default router;
