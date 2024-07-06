import express, {Router } from 'express';
const router = Router()
import * as paymentController from '../controllers/paymentController'

import AuthMiddleware from "../middlewares/authMiddleware";
import {getPublicSessionUrl, testWebhook} from "../controllers/paymentController";
router.post('/webhook',express.raw({type: 'application/json'}), paymentController.webhook);
router.post('/test', paymentController.testWebhook);
router.put('/cancel', [AuthMiddleware],paymentController.cancelPlan)
router.get('/history', [AuthMiddleware], paymentController.billingHistory)
router.get('/session-url',[AuthMiddleware], paymentController.getSessionUrl)
router.get('/public-session-url', getPublicSessionUrl)
router.get("/plans", paymentController.getPlans)
router.get('/billing', [AuthMiddleware], paymentController.billingHistory);



export default router