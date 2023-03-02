import express from "express";
import { getManga } from "../controller/manga.js";

const router = express.Router();

router.get("/", getManga);

export default router;
