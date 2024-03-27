import { Router } from "express";
import { registerBrand } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register-store", registerBrand);

export default router;
