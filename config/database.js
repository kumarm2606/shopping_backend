const mysql = require('mysql');
const conn = mysql.createConnection({
    port:process.env.DB_PORT,
  host     : process.env.DB_HOST,
  user     :process.env.USER_NAME,
  password :process.env.DB_PASSWORD,
  database : process.env.MYSQL_DB ,

});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected!');
});
module.exports = conn;