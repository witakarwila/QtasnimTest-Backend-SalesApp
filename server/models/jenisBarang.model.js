import db from "../config/db.config.js";

export const getAllData = (result) => {
  db.query("SELECT * FROM JenisBarang", (err, results) => {
      if(err) {
          console.log(err);
          result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const getDataById = (id, result) => {
  db.query("SELECT * FROM JenisBarang WHERE id = ?", [id], (err, results) => {
      if(err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
  });
}

export const insertData = (data, result) => {
  db.query("INSERT INTO JenisBarang SET ?", [data], (err, results) => {
      if(err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const updateDataById = (data, id, result) => {
  db.query("UPDATE JenisBarang SET nama = ? WHERE id = ?", [data.nama, id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const deleteData = (id, result) => {
  db.query("DELETE FROM JenisBarang WHERE id = ?", [id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}