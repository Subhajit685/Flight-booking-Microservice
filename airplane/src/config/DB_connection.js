import mysql from "mysql2";

const con = mysql.createPool({
  host: "mysql",
  port: 3306,
  user: "root",
  password: "root",
  database: "airplane",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

con.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to mysql pool =", err);
    return;
  }
  console.log("Connected to database successfully");
  if (connection) connection.release();
});

export default con.promise();
