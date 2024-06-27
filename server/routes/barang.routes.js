import express from 'express'

import { showAllData, showDataById, createData, editDataById, removeData } from '../controllers/barang.js'

const router = express.Router()

router.get('/', showAllData)
router.get('/:id', showDataById)
router.post('/', createData)
router.put('/:id', editDataById)
router.delete('/:id', removeData)

export default router