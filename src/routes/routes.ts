import { Router } from "express";
import authRoutes from "./auth.route";
import paymentRoutes from "./payment.route";
import categoryRoutes from "./category.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/payment", paymentRoutes);
router.use("/category", categoryRoutes);

export default router;
