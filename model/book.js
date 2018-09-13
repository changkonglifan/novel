const mongoose = require('../dataHelp/mongodb');
const schema = mongoose.Schema;

const bookSchema = new schema({
    name: String,//书名id
    author: String,//作者
    time: String,//最后更新时间
    type: String,//类型
    img: String,//封面
    id: String,//书id
})

const bookObj = {};


module.exports = bookObj;