import express from "express";
import { deleteVisitById } from "../controllers/visitsController.js";
import { getVisits } from "../controllers/visitsController.js";

const router = express.Router();

router.post("/delete-id", deleteVisitById);
router.get("/", getVisits);

export default router;
