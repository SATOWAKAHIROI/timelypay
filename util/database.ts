import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//クエリの実行結果をPromiseとして返す
const promisePool = pool.promise();


export default promisePool;
