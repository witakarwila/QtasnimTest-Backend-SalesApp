import mysql from "mysql2";

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'secret12345',
	database: 'db_sales'
});

export default db;