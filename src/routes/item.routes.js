import { Router } from "express";
import { userAuth } from '../middlewares/auth-middleware.js';
import { createItem, getItemsByStore, getCategories, getItemsByCategory, getColors, getSizes, getItemsById, getItemsByPriority } from "../controllers/item.controller.js";
const router = Router();

router.post("/store-item", userAuth({ ability: "store_item" }), createItem);
router.get("/get-items-by-store/:store_id", getItemsByStore);
router.get("/get-categories", getCategories);
router.get("/get-colors", getColors);
router.get("/get-sizes", getSizes);
router.get("/get-items-by-category/:category", getItemsByCategory);
router.get("/product/:product_id", getItemsById);
router.get("/get-items-by-priority", getItemsByPriority);

export default router;