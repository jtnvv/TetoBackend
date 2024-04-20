import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import {  fetchUserOrders } from "../controllers/order.controller.js";

const router = Router();

router.get("/fetch-user-orders",userAuth({ ability: "fetch_user_orders" }),fetchUserOrders)


export default router;
