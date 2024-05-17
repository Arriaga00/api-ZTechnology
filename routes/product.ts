import { Router } from "express";
import {consultProducts , saveProduct , updateProduct , deleteProduct} from '../controllers/product'

const router = Router();

router.get('/consultar-productos', consultProducts);
router.post('/guardar-producto', saveProduct);
router.put('/actualizar-producto', updateProduct);
router.delete('/eleminar-producto/:id', deleteProduct);


export default router