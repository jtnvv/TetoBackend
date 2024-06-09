import { Router } from "express";
import {
  getUsers,
  register,
  login,
  logout,
  sendEmail,
  changePassword,
  isActive,
} from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { userAuth } from '../middlewares/auth-middleware.js';
import { registerValidation, loginValidation } from "../validators/auth.js";

const router = Router();

router.get('/get-users', getUsers);
router.get("/is-active", userAuth({ ability: "check_is_active" }), isActive);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post("/send_recovery_email", sendEmail);
router.post("/change-password", changePassword);

router.get('/logout', logout);

export default router;
