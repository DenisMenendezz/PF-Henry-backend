import { Router } from "express";
import {getproducts, createproducts } from '../controllers/productscontroller.js'

const router = Router()

router.get('/products', getproducts);
router.post('/products/create', createproducts);
router.delete('/products/:id');
router.get('/products/:id');
router.get('/products/:id');

export default router;
