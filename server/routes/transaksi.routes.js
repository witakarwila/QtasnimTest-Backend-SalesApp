import express from 'express'

import { showAllDataTransaksi, showAllDataTransaksiComparison, showDataTransaksiById, createDataTransaksi, editDataTransaksiById, removeDataTransaksi } from '../controllers/transaksi.js'

const router = express.Router()

router.get('/', showAllDataTransaksi)
router.get('/comparison', showAllDataTransaksiComparison)
router.get('/:id', showDataTransaksiById)
router.post('/', createDataTransaksi)
router.put('/:id', editDataTransaksiById)
router.delete('/:id', removeDataTransaksi)

export default router