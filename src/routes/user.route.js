import { Router } from "express";
import { registerUser, Userlogin } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(Userlogin); 


export default router;