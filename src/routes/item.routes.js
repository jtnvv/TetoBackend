import { Router } from "express";
import { userAuth } from '../middlewares/auth-middleware.js';
import { createItem, getItemsByStore, getCategories, getItemsByCategory, getColors, getSizes, getItemsById, getItemsByPriority, addToFavorites, isFavorite, getFavorites, isOwner, updateItem, getRelated } from "../controllers/item.controller.js";
const router = Router();

router.get("/get-items-by-store/:store_id", getItemsByStore);
router.get("/get-categories", getCategories);
router.get("/get-colors", getColors);
router.get("/get-sizes", getSizes);
router.get("/get-items-by-category/:category", getItemsByCategory);
router.get("/product/:product_id", getItemsById);
router.get("/get-items-by-priority", getItemsByPriority);
router.get("/is-favorite/:item_id", userAuth({ ability: "is_favorites" }), isFavorite);
router.get("/get-favorites", userAuth({ ability: "is_favorites" }), getFavorites);
router.get("/get-related/:item_id", getRelated);
router.get("/is-owner/:item_id", userAuth({ ability: "is_owner" }), isOwner);
router.post("/store-item", userAuth({ ability: "store_item" }), createItem);
router.post("/add-to-favorite", userAuth({ ability: "add_favorites" }), addToFavorites);
router.post("/update-item", userAuth({ ability: "update_item" }), updateItem);

export default router;