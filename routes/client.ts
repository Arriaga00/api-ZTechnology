import { Router } from "express";
import {getClients , creatClient} from '../controllers/client'

const router = Router()

router.get('/clientAll', getClients)
router.post('/createClient',creatClient)

export default router