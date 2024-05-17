import { Router } from 'express'
import { consultUser, consultUserById, consultUserByNames , saveUser, updateUser, deleteUser}  from '../controllers/user'
import {validateJWT} from '../middleware/validateJWT'
import upload from '../helpers/multer'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bienvenido  a este nuevo proceso de crear un servidor' })
})

router.get('/consultar-usuarios', consultUser)
router.get('/consultar-usuario/:id', consultUserById)
router.get('/consultar-usuario-nombre/:names', consultUserByNames)

router.post('/guardar-usuario',validateJWT,upload.single('photo'), saveUser)

router.put('/actualizar-usuario',validateJWT ,updateUser)

router.delete('/eliminar-usuario/:id', validateJWT,deleteUser)


router.get('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found | 404' })
})

export default router