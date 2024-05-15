import { Router } from "express";
import { getMercadoPagoPayment } from "../controllers/webhook.controller.js";

const router = Router();

router.post("/mercado_pago", getMercadoPagoPayment);

export default router;
