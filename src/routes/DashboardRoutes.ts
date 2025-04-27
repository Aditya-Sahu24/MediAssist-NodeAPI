import express from "express";

import { Dashboard } from "../controllers/Dashboard";


const router = express.Router();

router.post("/", Dashboard);

export default router;