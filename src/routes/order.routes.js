import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import { createPaymentLink, fetchBrandOrders, fetchUserOrders, itemRating, updateOrderRating, updateReceived, updateSend } from "../controllers/order.controller.js";

const router = Router();

router.get("/fetch-user-orders", userAuth({ ability: "fetch_user_orders" }), fetchUserOrders);
router.get("/fetch-brand-orders", userAuth({ ability: "fetch_brand_orders" }), fetchBrandOrders);
router.post("/get-payment-link", userAuth({ ability: "create_payment" }), createPaymentLink);
router.post("/update-order-rating", userAuth({ ability: "update_rating_order" }), updateOrderRating);
router.post("/update-item-rating", userAuth({ ability: "update_rating_order" }), itemRating);
router.post("/update-send", userAuth({ ability: "update_order_status" }), updateSend);
router.post("/update-received", userAuth({ ability: "update_order_status" }), updateReceived);

export default router;
