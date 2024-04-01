import { Router } from "express";
import { userAuth } from '../middlewares/auth-middleware.js';
import { createItem, getItemsByStore } from "../controllers/item.controller.js";
const router = Router();

router.post("/store-item", userAuth({ ability: "store_item" }), createItem);
router.get("/get-items-by-store/:store_id", getItemsByStore);

export default router;