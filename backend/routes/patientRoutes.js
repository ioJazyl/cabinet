import express from "express";
import {
  addPatient,
  getPatients,
  getPatientById,
  deletePatientById,
  deletePatientByBody,
  addPatientVisit,
  getPatientByFullName,
  getVisitsCount,
  getAllPatients,
} from "../controllers/patientController.js";

const router = express.Router();
router.post("/new", addPatient);
router.post("/new-visit", addPatientVisit);
router.get("/:id/count", getVisitsCount);

router.get("/", getPatients);
router.get("/all", getAllPatients);

router.get("/:id", getPatientById);
router.post("/", getPatientByFullName);
router.delete("/:id", deletePatientById);
router.post("/delete", deletePatientByBody);

export default router;
