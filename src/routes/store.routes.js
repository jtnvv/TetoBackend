import { Router } from "express";
import { getStore, createStore } from "../controllers/store.controller.js";

const router = Router();

router.get("/store", getStore);
router.post("/store", createStore);

export default router;
