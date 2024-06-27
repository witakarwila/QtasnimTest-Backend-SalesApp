import express from 'express'

import { showAllDataJenis, showDataJenisById, createDataJenis, updateDataJenisById, deleteDataJenis } from '../controllers/jenisBarang.js'

const router = express.Router()

router.get('/', showAllDataJenis)
router.get('/:id', showDataJenisById)
router.post('/', createDataJenis)
router.put('/:id', updateDataJenisById)
router.delete('/:id', deleteDataJenis)

export default router