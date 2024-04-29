import { Router } from "express";
import {getOrders , saveOrder , updateOrder} from '../controllers/order'


const router  = Router()

router.get('/ordersAll',getOrders)
router.post('/savOrder',saveOrder)
router.put('/updateOrder',updateOrder)

export default router