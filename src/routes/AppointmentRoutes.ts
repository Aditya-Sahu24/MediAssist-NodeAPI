import express from "express";

import { Appointment } from "../controllers/Appointment";


const router = express.Router();

router.post("/", Appointment);

export default router;