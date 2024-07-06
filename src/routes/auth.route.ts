import { Router } from "express";
import {
  confirmedLogin,
  getTools,
  loginUser,
  submitTool,
} from "../controllers/userController";
import { ownerMiddleware } from "../middlewares/ownerMiddleware";
import { isActivateMiddleware } from "../middlewares/isActivatedUser";
import AuthMiddleware from "../middlewares/authMiddleware";

const router = Router();
router.post("/signin", loginUser);
router.post("/signup", submitTool);
router.post("/comfirm", confirmedLogin);
router.get("/tools", AuthMiddleware, getTools);

export default router;
