import express from "express";

import { MedicalRecords } from "../controllers/MedicalRecords";


const router = express.Router();

router.post("/", MedicalRecords);

export default router;