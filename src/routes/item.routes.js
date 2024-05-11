import { Router } from "express";
import { userAuth } from '../middlewares/auth-middleware.js';
import { createItem, getItemsByStore, getCategories, getItemsByCategory, getColors, getSizes, getItemsById, getItemsByPriority, addToFavorites, isFavorite } from "../controllers/item.controller.js";
const router = Router();

router.post("/store-item", userAuth({ ability: "store_item" }), createItem);
router.get("/get-items-by-store/:store_id", getItemsByStore);
router.get("/get-categories", getCategories);
router.get("/get-colors", getColors);
router.get("/get-sizes", getSizes);
router.get("/get-items-by-category/:category", getItemsByCategory);
router.get("/product/:product_id", getItemsById);
router.get("/get-items-by-priority", getItemsByPriority);
router.post("/add-to-favorite", userAuth({ ability: "add_favorites" }), addToFavorites);
router.get("/is-favorite/:item_id", userAuth({ ability: "is_favorites" }), isFavorite);

export default router;