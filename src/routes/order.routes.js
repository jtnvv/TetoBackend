import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import {  fetchBrandOrders, fetchUserOrders,updateSend } from "../controllers/order.controller.js";

const router = Router();

router.get("/fetch-user-orders",userAuth({ ability: "fetch_user_orders" }),fetchUserOrders)
router.get("/fetch-brand-orders",userAuth({ ability: "fetch_brand_orders" }),fetchBrandOrders)
router.post("/update-send",userAuth({ ability: "fetch_brand_orders" }),updateSend)

export default router;
