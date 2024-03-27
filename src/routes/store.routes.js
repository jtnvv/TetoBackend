import { Router } from "express";
import { registerBrand } from "../controllers/auth.controller.js";
import { getStoreById, getStores } from "../controllers/store.controller.js"
const router = Router();

router.post("/register-store", registerBrand);
router.get("/store/:store_id", getStoreById);
router.get("/stores", getStores);

export default router;
