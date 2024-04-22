import { Router } from "express";
import { createUser, getUserProfile, updateUserInformation } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth-middleware.js";



const router = Router();

router.post("/user", createUser);
router.get("/userInformation",userAuth({ ability: "user_information" }), getUserProfile);
router.post("/updateUserInformation",userAuth({ ability: "update_user_information" }),updateUserInformation)

export default router;
