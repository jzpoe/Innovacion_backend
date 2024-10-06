import express from 'express';
import novedades from '../controllers/controllers.js';
const router = express.Router()




router.post('/', novedades.create)
router.get('/', novedades.novedadeGet)
router.get('/filtrar', novedades.filtradosGet)
router.delete('/:delete', novedades.deleteNovedad)




export default router;

