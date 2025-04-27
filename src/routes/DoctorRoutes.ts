import express from "express";

import { Doctor } from "../controllers/Doctor";


const router = express.Router();

router.post("/", Doctor);

export default router;