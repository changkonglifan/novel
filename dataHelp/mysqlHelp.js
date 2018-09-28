const mysql = require('mysql');
const { mysqldb } = require('../config');
const chalk = require("chalk");
//创建连接池
var pool = mysql.createPool(mysqldb);
/**
 * 查询数据
 * 同步操作
 * @param {*} sql 
 * @param {*} data 
 * @param {*} fn 
 */
exports.query = function (sql, data) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                console.log(chalk.green('连接数据库成功'));
                connection.query(sql, data, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}