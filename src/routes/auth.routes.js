import { Router } from "express";
import {
  getUsers,
  register,
  login,
  logout,
  sendEmail,
  changePassword,
} from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { registerValidation, loginValidation } from "../validators/auth.js";

const router = Router();

router.get('/get-users', getUsers);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post("/send_recovery_email", sendEmail);
router.post("/change-password", changePassword);


router.get('/logout', logout);

export default router;
