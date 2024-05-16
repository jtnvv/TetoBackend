import { Router } from "express";
import { userAuth } from "../middlewares/auth-middleware.js";
import { createPaymentLink, deleteOrder, fetchBrandOrders, fetchUserOrders, itemRating, sendEmailCancelOrder, updateOrderRating } from "../controllers/order.controller.js";


const router = Router();

router.get("/fetch-user-orders", userAuth({ ability: "fetch_user_orders" }), fetchUserOrders);
router.get("/fetch-brand-orders", userAuth({ ability: "fetch_brand_orders" }), fetchBrandOrders);
router.post("/get-payment-link", userAuth({ ability: "create_payment" }), createPaymentLink);
router.post("/update-order-rating", userAuth({ ability: "update_rating_order" }), updateOrderRating);
router.post("/update-item-rating", userAuth({ ability: "update_rating_order" }), itemRating);
router.delete("/delete-order/:id", userAuth({ ability: "delete_user_order" }),deleteOrder);
router.post("/send_cancel_order__email",userAuth({ ability: "send_email_cancel_order" }), sendEmailCancelOrder);
export default router;
