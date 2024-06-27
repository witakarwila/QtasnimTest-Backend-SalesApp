import { getAllData, getDataById, insertData, updateDataById, deleteData } from "../models/jenisBarang.model.js";

export const showAllDataJenis = (req, res) => {
	getAllData((err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const showDataJenisById = (req, res) => {
	getDataById(req.params.id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const createDataJenis = (req, res) => {
	const data = req.body;
	insertData(data, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const updateDataJenisById = (req, res) => {
	var data = req.body;
	var id = req.params.id;
	updateDataById(data, id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const deleteDataJenis = (req, res) => {
	var id = req.params.id;
	deleteData(id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}