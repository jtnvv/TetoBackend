import { Router } from "express";
import {
  getUsers,
  register,
  login,
  logout,
  brandLogin,
  sendEmail,
} from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { registerValidation, loginValidation, loginStoreValidation} from "../validators/auth.js";


const router=Router();

router.get('/get-users',getUsers);

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/login-store', loginStoreValidation,validationMiddleware, brandLogin);
app.post("/send_recovery_email", sendEmail);

router.get('/logout',logout);

export default router;
