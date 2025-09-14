import { Router} from "express";
import { registerBus, searchBuses, getBusLocation } from "../controllers/Bus.controller.js";

const router = Router();

router.route("/registerBus").post(registerBus);
router.route("/searchBuses").get(searchBuses);
router.route("/busLocation/:id").get(getBusLocation);
export default router;