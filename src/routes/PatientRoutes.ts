import express from "express";

import { Patient } from "../controllers/Patient";


const router = express.Router();

router.post("/", Patient);

export default router;