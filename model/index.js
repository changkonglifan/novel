const mysqlHelp = require('../dataHelp/mysqlHelp'); 
const sqlList = require('../model/sqlList');

const IndexModel = {};
/**
 * 获取推荐
 */
IndexModel.getRecommend = async function (params) {
    return await mysqlHelp.query(sqlList.GET_RECOMMEND, params);
}
/**
 * 查询最近更新
 */
IndexModel.getLast = async function (params) {
    return await mysqlHelp.query(sqlList.GET_LAST, params);
}
/**
 * 查询最热门
 */
IndexModel.getHots = async function(params) {
    return await mysqlHelp.query(sqlList.GET_BOOKS, params);
}
/**
 * 最新入库
 */
IndexModel.getLastIn = async function (params) {
    return await mysqlHelp.query(sqlList.GET_BOOKS, params);
}
/**
 * 获取书本信息
 */
IndexModel.getBookInfo = async function (params) {
    return await mysqlHelp.query(sqlList.GET_BOOK_INFO, params)
}
/**
 * 获取章节列表
 */
IndexModel.getChapterList = async function (params) {
    await mysqlHelp.query(sqlList.GET_CHAPTERS_LIST, params)
}
module.exports = IndexModel;