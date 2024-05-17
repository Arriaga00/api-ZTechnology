import { Router } from "express";
import { getOrders, saveOrder, updateOrder } from "../controllers/order";
import { validateJWT } from "../middleware/validateJWT";
const router = Router();

router.get("/ordersAll", getOrders);
router.post("/savOrder", saveOrder);
router.put("/updateOrder", validateJWT, updateOrder);

export default router;
