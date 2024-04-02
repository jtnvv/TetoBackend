import { Router } from "express";
import { registerBrand } from "../controllers/auth.controller.js";
import { getStoreById, getStores } from "../controllers/store.controller.js"
import { validationMiddleware } from "../middlewares/validations-middleware.js";
const router = Router();

router.post("/register-store", validationMiddleware, registerBrand);
router.get("/store/:store_id", getStoreById);
router.get("/stores", getStores);

export default router;
