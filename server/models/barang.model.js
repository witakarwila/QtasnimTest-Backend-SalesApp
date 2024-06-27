import db from "../config/db.config.js";

export const getAllData = (result) => {
  db.query("SELECT * FROM Barang", (err, results) => {
      if(err) {
          console.log(err);
          result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const getDataById = (id, result) => {
  db.query("SELECT * FROM Barang WHERE id = ?", [id], (err, results) => {
      if(err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
  });
}

export const insertData = (data, result) => {
  db.query("INSERT INTO Barang SET ?", [data], (err, results) => {
      if(err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const updateDataById = (data, id, result) => {
  db.query("UPDATE Barang SET nama = ?, stok = ? WHERE id = ?", [data.nama, data.stok, id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const deleteData = (id, result) => {
  db.query("DELETE FROM Barang WHERE id = ?", [id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}