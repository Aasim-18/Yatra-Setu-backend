import { Router} from "express";
import { registerBus } from "../controllers/Bus.controller.js";

const router = Router();

router.route("/registerBus").post(registerBus);

export default router;