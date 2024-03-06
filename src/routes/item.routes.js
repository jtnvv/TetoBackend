import { Router } from "express";
import { createItem, getItem } from "../controllers/item.controller.js";
const router = Router();

router.get('/item', getItem);
router.post("/item", createItem);

export default router;