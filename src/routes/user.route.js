import { Router } from "express";
import { registerUser, Userlogin, forgetPassword } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(Userlogin);
router.route("/forgetPassword").post(forgetPassword); 


export default router;