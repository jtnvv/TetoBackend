import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import {  fetchBrandOrders, fetchUserOrders } from "../controllers/order.controller.js";

const router = Router();

router.get("/fetch-user-orders",userAuth({ ability: "fetch_user_orders" }),fetchUserOrders)
router.get("/fetch-brand-orders",userAuth({ ability: "fetch_brand_orders" }),fetchBrandOrders)

export default router;
