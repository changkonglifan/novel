const mongoose = require('../dataHelp/mongodb');
const schema = mongoose.Schema;

const chaptersSchema = new schema({
    bookId: String,//
    chpaterId: String,//
    chapterName: String,//
    chapterTxt: String,//
    updateTime: Date,//
    createTime: Date,//
})
//定义model
var chapterModel = mongoose.model('chapters', chaptersSchema);

const chapterObj = {};
/**
 * 根据书id获取章节信息
 */
chapterObj.getChapterByBookId = async (id) => {
    return await chapterModel
        .find(
            {
                bookId: id
            }
        )
        .sort(
            {
                updateTime: 1
            }
        )
        .limit(1);
}
/**
 * 查询所有
 */
chapterObj.getAll = async ()=>{
    return await chapterModel.find();
}
module.exports = chapterObj;