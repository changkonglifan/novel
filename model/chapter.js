const mongoose = require('../dataHelp/mongodb');
const schema = mongoose.Schema;

const chaptersSchema = new schema({
    name: String,//书名id
    author: String,//作者
    time: Date,//最后更新时间
    type: String,//类型
    img: String,//封面
    id: String,//书id
    watch: Number,//阅读次数
    isRecommend: Boolean,//是否推荐
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

return chapterObj;