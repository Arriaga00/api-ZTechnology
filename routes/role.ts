import { Router } from "express";
import { consultRoles, consultRolesById } from '../controllers/role'
 
const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Roles' })
})

router.get('/cosnultar-roles', consultRoles)
router.get('/cosnultar-role/:id', consultRolesById)

export default router