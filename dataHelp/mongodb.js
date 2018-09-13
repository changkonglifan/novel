/**
 * 操作mongo 数据库
 */
const { mongodb } = require('../config')
var mongoose = require('mongoose');
var chalk = require("chalk");
mongoose.connection.openUri(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.collection}`); //连接到一个test的数据库

mongoose.Promise = require('bluebird');
const db = mongoose.connection;
//数据库链接成功
db.once('open', () => {
    console.log(chalk.green('连接数据库成功'));
})
//数据库链接失败
db.on("error", function (err) {
    console.log(chalk.red("blog connection error" + err));
})
//断开链接
db.on("disconnected", function (err) {
    console.log(chalk.green("blog disconnected"));
})
//关闭
process.on("SIGINT", function () {
    db.close(function () {
        process.exit(0);
    })
})
module.exports = mongoose; 