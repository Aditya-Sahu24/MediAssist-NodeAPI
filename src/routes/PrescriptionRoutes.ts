import express from "express";

import { Prescription } from "../controllers/Prescription";


const router = express.Router();

router.post("/", Prescription);

export default router;