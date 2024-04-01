import { Router } from "express";
import {
  getUsers,
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { registerValidation, loginValidation } from "../validators/auth.js";

const router=Router();

router.get('/get-users',getUsers);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout',logout);

export default router;
