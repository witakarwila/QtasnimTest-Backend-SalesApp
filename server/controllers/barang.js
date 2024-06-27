import { getAllData, getDataById, insertData, updateDataById, deleteData } from "../models/barang.model.js";

export const showAllData = (req, res) => {
	getAllData((err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const showDataById = (req, res) => {
	getDataById(req.params.id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const createData = (req, res) => {
	const data = req.body;
	insertData(data, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}

export const editDataById = (req, res) => {
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

export const removeData = (req, res) => {
	var id = req.params.id;
	deleteData(id, (err, results) => {
		if(err) {
			res.send(err);
		} else {
			res.json(results)
		}
	})
}