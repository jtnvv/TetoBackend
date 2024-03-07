import { Router } from "express";
import {
  getUsers,
  register,
  login,
  protectedRoute,
  logout,
} from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validations-middleware.js";
import { registerValidation, loginValidation } from "../validators/auth.js";
import {userAuth} from '../middlewares/auth-middleware.js';

const router=Router();

router.get('/get-users',getUsers);
router.get("/protected", userAuth({ability: "hola"}), protectedRoute);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware,login);
router.get('/logout',logout);

export default router;
