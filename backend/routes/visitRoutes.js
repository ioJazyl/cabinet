import express from "express";
import {
  deleteVisitById,
  updateVisit,
} from "../controllers/visitsController.js";
import { getVisits } from "../controllers/visitsController.js";

const router = express.Router();

router.post("/delete-id", deleteVisitById);
router.get("/", getVisits);
router.put("/update", updateVisit);

export default router;
