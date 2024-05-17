import { Router } from "express";
import {
  consultDetailsProducts,
  ConsulDetailsProductById,
} from "../controllers/order_Detail";
const router = Router();

router.get("/consultDetailsProducts", consultDetailsProducts);
router.get("/consultDetailsProducts/:id", ConsulDetailsProductById);

export default router;
