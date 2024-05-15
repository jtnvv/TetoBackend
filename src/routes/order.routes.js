import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import { createPaymentLink, fetchBrandOrders, fetchUserOrders } from "../controllers/order.controller.js";

const router = Router();

router.get("/fetch-user-orders",userAuth({ ability: "fetch_user_orders" }),fetchUserOrders);
router.get("/fetch-brand-orders", userAuth({ ability: "fetch_brand_orders" }), fetchBrandOrders);
router.post("/get-payment-link", userAuth({ ability: "create_payment" }) , createPaymentLink);

export default router;
