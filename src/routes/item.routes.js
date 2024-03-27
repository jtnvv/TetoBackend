import { Router } from "express";
import {userAuth} from '../middlewares/auth-middleware.js';
import { createItem } from "../controllers/item.controller.js";
const router = Router();

router.post("/store-item", userAuth({ability: "store_item"}), createItem);

export default router;