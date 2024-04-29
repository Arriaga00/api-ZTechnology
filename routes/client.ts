import { Router } from "express";
import {getClients} from '../controllers/client'

const router = Router()

router.get('/clientAll', getClients)

export default router