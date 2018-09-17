const mongoose = require('../dataHelp/mongodb');
const chapterModel = require('./chapter')
const {webSet} = require('../config')
const schema = mongoose.Schema;

const bookSchema = new schema({
    name: String,//书名id
    author: String,//作者
    time: { type: Date, default: Date.now},//最后更新时间
    type: String,//类型
    img: String,//封面
    id: String,//书id
    watch: Number,//阅读次数
    updateTime: { type: Date, default: Date.now},//更新时间
    isRecommend:  {type: Boolean, default: true}//是否推荐
})
//定义model
var bookModel = mongoose.model('books', bookSchema);

const bookObj = {};
/**
 * 翻页查询
 * @param {*} params 
 */
bookObj.getBookListByTypeName = async (params) => {
    const list = await bookModel
                            .find(
                                { 
                                    type: params.typeName 
                                }
                            )
                            .sort(
                                { 
                                    time: '1' 
                                }
                            )
                            .skip((params.page - 1) * webSet.pageSize)
                            .limit(webSet.pageSize);
    const length = await bookModel
                            .countDocuments(
                                { 
                                    type: params.typeName
                                }
                            );
    return { 
        list,
        length
    }
}
/**
 * 获取推荐的十条
 */
bookObj.getRecommend = async () => {
    return await bookModel
                        .find(
                            {
                                isRecommend: true
                            },
                            {
                                img:1,
                                time:1,
                                name:1,
                                watch:1, 
                                id:1,
                                author: 1
                            }
                        )
                        .sort(
                            {
                                updateTime: 1
                            }
                        )
                        .limit(10);
}
/**
 * 根据时间查询最新更新十条
 */
bookObj.getLastUpdate = async () => {
    return await bookModel
                        .find(
                            {},
                            {
                                type:1,
                                time:1,
                                name:1,
                                watch:1, 
                                id:1,
                                author: 1
                            }
                        )
                        .sort({updateTime:1})
                        .limit(10)
                        .populate(
                            {
                                path:'id',
                                select:{
                                    chapterName:1,
                                    chpaterId:1,
                                    updateTime: 1
                                },
                                options:{
                                    sort:{
                                        updateTime:1
                                    },
                                    limit: 1
                                }
                            }
                        );
}
/**
 * 获取热门列表
 */
bookObj.getHotList = async () => {
    return await bookModel
                        .find(
                            {},
                            {
                                name:1,
                                watch:1,
                                id:1,
                                author: 1
                            }
                        )
                        .sort({watch: 1})
                        .limit(20);
}
module.exports = bookObj;