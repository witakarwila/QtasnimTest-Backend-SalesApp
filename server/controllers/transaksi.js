import { getAllDataTransaksi, getAllDataTransaksiComparison, getDataTransaksiById, insertDataTransaksi, updateDataTransaksiById, deleteDataTransaksi } from "../models/transaksi.model.js";

export const showAllDataTransaksi = (req, res) => {
	getAllDataTransaksi(req.query, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const showAllDataTransaksiComparison = (req, res) => {
	getAllDataTransaksiComparison(req.query, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const showDataTransaksiById = (req, res) => {
	getDataTransaksiById(req.params.id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const createDataTransaksi = (req, res) => {
	const data = req.body;
	insertDataTransaksi(data, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const editDataTransaksiById = (req, res) => {
	var data = req.body;
	var id = req.params.id;
	updateDataTransaksiById(data, id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const removeDataTransaksi = (req, res) => {
	var id = req.params.id;
	deleteDataTransaksi(id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}