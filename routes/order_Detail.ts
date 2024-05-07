import { Router } from "express";
import {consultDetailsProducts} from '../controllers/order_Detail'
const router = Router()

router.get('/consultDetailsProducts',consultDetailsProducts)

export default router