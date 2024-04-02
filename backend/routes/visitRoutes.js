import express from "express";
import deleteVisitById from "../controllers/visitsController.js";

const router = express.Router();

router.post("/delete-id", deleteVisitById);

export default router;
