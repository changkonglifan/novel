const mongoose = require('../dataHelp/mongodb');
const {webset} = require('../config')
const schema = mongoose.Schema;

const bookSchema = new schema({
    name: String,//书名id
    author: String,//作者
    time: String,//最后更新时间
    type: String,//类型
    img: String,//封面
    id: String,//书id
})
//定义model
var bookModel = mongoose.model('books', bookSchema);

const bookObj = {};
/**
 * 翻页查询
 * @param {*} params 
 */
bookObj.getBookListByTypeName = async (params) => {
    const list = await bookModel.find({ type: params.typeName }).sort({ time: '1' }).skip((params.page - 1) * webset.pageSize).limit(webset.pageSize);
    const length = await bookModel.find({ type: params.typeName}).length();
    return {
        list,
        length
    }
}
module.exports = bookObj;