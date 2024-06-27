import db from "../config/db.config.js";


const currentDate = new Date();
const datetime = currentDate.toISOString().slice(0, 19).replace('T', ' ');

export const getAllDataTransaksi = (params, result) => {
  const { nama_barang, sort_by } = params;

  let query = "SELECT Transaksi.id, Transaksi.id_barang, Transaksi.stok, Transaksi.jumlah, DATE_FORMAT(Transaksi.tanggal_transaksi, '%d-%m-%Y') AS tanggal_transaksi, Barang.nama as nama_barang, JenisBarang.nama as jenis_barang FROM db_sales.Transaksi LEFT JOIN Barang ON Transaksi.id_barang = Barang.id LEFT JOIN JenisBarang ON Barang.id_jenis_barang = JenisBarang.id";

  const conditions = [];
  if (nama_barang) {
    conditions.push(`Barang.nama LIKE '%${nama_barang}%'`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  if (sort_by) {
    query += ` ORDER BY ${sort_by}`;
  }

  db.query(query, (err, results) => {
      if(err) {
          console.log(err);
          result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const getAllDataTransaksiComparison = (params, result) => {
  const { id_jenis_barang, sort_by_amount, start_date, end_date } = params;
  let query;

  if( id_jenis_barang != '' && sort_by_amount != '' && start_date != '' && end_date != ''){
    if(sort_by_amount == 'least_sold') {
      var sortBy = "MIN(jumlah)";
    }else {
      var sortBy = "MAX(jumlah)";
    }

    query = `SELECT t.id, t.id_barang, t.stok, t.jumlah, DATE_FORMAT(t.tanggal_transaksi, '%d-%m-%Y') AS tanggal_transaksi, Barang.nama as nama_barang, JenisBarang.nama as jenis_barang
      FROM (
        SELECT JenisBarang.nama as jenis_barang, ${sortBy} as jumlah_max 
        FROM Transaksi 
        JOIN Barang ON Transaksi.id_barang = Barang.id
        JOIN JenisBarang ON Barang.id_jenis_barang = JenisBarang.id 
        WHERE JenisBarang.id = ${id_jenis_barang}
        AND Transaksi.tanggal_transaksi BETWEEN '${start_date} 00:00:00' AND '${end_date} 23:00:00'
        GROUP BY JenisBarang.nama
      ) as max_transaksi
      JOIN Transaksi t ON max_transaksi.jumlah_max = t.jumlah
      JOIN Barang ON t.id_barang = Barang.id
      JOIN JenisBarang ON Barang.id_jenis_barang = JenisBarang.id`;
  } else {
    query = "SELECT Transaksi.id, Transaksi.id_barang, Transaksi.stok, Transaksi.jumlah, DATE_FORMAT(Transaksi.tanggal_transaksi, '%d-%m-%Y') AS tanggal_transaksi, Barang.nama as nama_barang, JenisBarang.nama as jenis_barang FROM db_sales.Transaksi LEFT JOIN Barang ON Transaksi.id_barang = Barang.id LEFT JOIN JenisBarang ON Barang.id_jenis_barang = JenisBarang.id";
  }

  db.query(query, (err, results) => {
      if(err) {
          console.log(err);
          result(err, null);
      } else {
        result(null, results);
      }
  });
}

export const getDataTransaksiById = (id, result) => {

  db.query("SELECT db_sales.Transaksi.*, Barang.nama as nama_barang, JenisBarang.nama as jenis_barang FROM db_sales.Transaksi LEFT JOIN Barang ON Transaksi.id_barang = Barang.id LEFT JOIN JenisBarang ON Barang.id_jenis_barang = JenisBarang.id WHERE Transaksi.id = ?", [id], (err, results) => {
      if(err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
  });
}

export const insertDataTransaksi = (data, result) => {  
  const idBarang = data.id_barang;
  const jumlahOrder = data.jumlah;

  if(idBarang != '' && jumlahOrder != 0){
    db.beginTransaction((err) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
  
      db.query(
        "SELECT stok FROM Barang WHERE id = ? FOR UPDATE",
        [idBarang],
        (err, stockResults) => {
          if (err) {
            db.rollback(() => { 
              console.log(err);
              result(err, null);
            });
            return;
          }
  
          const currentStock = stockResults[0].stok;
          const newStock = currentStock - jumlahOrder;
  
          const newDataTrx = {
            ...data,
            tanggal_transaksi: datetime,
            stok: currentStock,
          };
  
          db.query("INSERT INTO Transaksi SET ?", [newDataTrx], (err, results) => {
            if (err) {
              db.rollback(() => {
                console.log(err);
                result(err, null);
              });
              return;
            }
  
            db.query(
              "UPDATE Barang SET stok = ? WHERE id = ?",
              [newStock, idBarang],
              (err, updateResults) => {
                if (err) {
                  db.rollback(() => {
                    console.log(err);
                    result(err, null);
                  });
                  return;
                }
  
                db.commit((err) => {
                  if (err) {
                    console.log(err);
                    result(err, null);
                  } else {
                    result(null, results);
                  }
                });
              }
            );
          });
        }
      );
    });
  }
}
export const updateDataTransaksiById = (data, id, result) => {
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    db.query(
      "SELECT jumlah, id_barang FROM Transaksi WHERE id = ?",
      [id],
      (err, transaksiResults) => {
        if (err) {
          db.rollback(() => {
            console.log(err);
            result(err, null);
          });
          return;
        }

        const oldJumlah = transaksiResults[0].jumlah;
        const newJumlah = data.jumlah;
        const idBarang = transaksiResults[0].id_barang;

        db.query("UPDATE Transaksi SET ? WHERE id = ?", [data, id], (err, updateResults) => {
          if (err) {
            db.rollback(() => {
              console.log(err);
              result(err, null);
            });
            return;
          }

          db.query(
            "SELECT stok FROM Barang WHERE id = ? FOR UPDATE",
            [idBarang],
            (err, stockResults) => {
              if (err) {
                db.rollback(() => {
                  console.log(err);
                  result(err, null);
                });
                return;
              }

              const currentStock = stockResults[0].stok;
              if(newJumlah > oldJumlah){
                var stockAdjustment = `stok - ${newJumlah - oldJumlah}`
              }else{
                var stockAdjustment = `stok + ${oldJumlah - newJumlah}`
              }

              db.query(
                `UPDATE Barang SET stok = ${stockAdjustment} WHERE id = ?`,
                [idBarang],
                (err, stockUpdateResults) => {
                  if (err) {
                    db.rollback(() => {
                      console.log(err);
                      result(err, null);
                    });
                    return;
                  }

                  db.commit((err) => {
                    if (err) {
                      console.log(err);
                      result(err, null);
                    } else {
                      result(null, updateResults);
                    }
                  });
                }
              );
            }
          );
        });
      }
    );
  });
};

export const deleteDataTransaksi = (id, result) => {
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    db.query(
      "SELECT jumlah, id_barang FROM Transaksi WHERE id = ?",
      [id],
      (err, transaksiResults) => {
        if (err) {
          db.rollback(() => {
            console.log(err);
            result(err, null);
          });
          return;
        }

        if (transaksiResults.length === 0) {
          db.rollback(() => {
            result({ message: "Transaction not found" }, null);
          });
          return;
        }

        const deletedJumlah = transaksiResults[0].jumlah;
        const idBarang = transaksiResults[0].id_barang;

        db.query("DELETE FROM Transaksi WHERE id = ?", [id], (err, deleteResults) => {
          if (err) {
            db.rollback(() => {
              console.log(err);
              result(err, null);
            });
            return;
          }

          db.query(
            "UPDATE Barang SET stok = stok + ? WHERE id = ?",
            [deletedJumlah, idBarang],
            (err, updateResults) => {
              if (err) {
                db.rollback(() => {
                  console.log(err);
                  result(err, null);
                });
                return;
              }

              db.commit((err) => {
                if (err) {
                  console.log(err);
                  result(err, null);
                } else {
                  result(null, deleteResults);
                }
              });
            }
          );
        });
      }
    );
  });
};
