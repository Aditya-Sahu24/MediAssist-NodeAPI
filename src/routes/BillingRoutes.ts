import express from "express";

import { Billing } from "../controllers/Billing";


const router = express.Router();

router.post("/", Billing);

export default router;