import { Router } from "express";
import { userAuth } from '../middlewares/auth-middleware.js';
import { registerBrand } from "../controllers/auth.controller.js";
import { getStoreById, getStores, getStoreProfile, updateStoreInformation, deleteItemBrand } from "../controllers/store.controller.js"
import { validationMiddleware } from "../middlewares/validations-middleware.js";
const router = Router();

router.post("/register-store", validationMiddleware, registerBrand);
router.get("/store/:store_id", getStoreById);
router.get("/storeInformation",userAuth({ ability: "brand_information" }),getStoreProfile)
router.post("/updateInformation",userAuth({ ability: "update_brand_information" }),updateStoreInformation)
router.delete("/delete-item/:id", userAuth({ ability: "delete_item" }), deleteItemBrand);

router.get("/stores", getStores);

export default router;
