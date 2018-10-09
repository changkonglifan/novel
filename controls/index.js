// const types = require('../model/types');
// const books = require('../model/book');
const sqlList = require('../model/sqlList');
const mysqlHelp = require('../dataHelp/mysqlHelp');
const URL = require('url');
/**
 * 显示首页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showIndex = async (ctx, next) => {
    const recommend = await mysqlHelp.query(sqlList.GET_RECOMMEND,[]);
    const last = await mysqlHelp.query(sqlList.GET_LAST,[]);
    const hot = await mysqlHelp.query(sqlList.GET_BOOKS,['watch',20]);
    const lastIn = await mysqlHelp.query(sqlList.GET_BOOKS,['createTime',10]);
    await ctx.render('index',{
        ...ctx.state,
        current:'index',
        recommend,
        last,
        hot,
        lastIn
    })
}
/**
 * 显示章节页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showChapter = async (ctx, next) => {
    const bookId = ctx.params.id;
    const bookInfo = await mysqlHelp.query(sqlList.GET_BOOK_INFO,[bookId]);
    const chapters = await mysqlHelp.query(sqlList.GET_CHAPTERS_LIST,[bookId]);
    await ctx.render('chapter',{
        ...ctx.state,
        current: 'index',
        title:'章节页',
        bookInfo: bookInfo[0],
        chapters
    })
}
/**
 * 列表页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showList = async (ctx, next) => {
    const id = ctx.params.id;
    const typeName = await mysqlHelp.query(sqlList.GET_TYPE_NAME_BY_ID,[id]);
    const last = await mysqlHelp.query(sqlList.GET_BOOKS_BY_TYPENAME,[typeName[0].typeName,'time',10]);
    const hot = await mysqlHelp.query(sqlList.GET_BOOKS_BY_TYPENAME, [typeName[0].typeName,'watch', 10]);
    await ctx.render('list',{
        ...ctx.state,
        current: 'index',
        title:'列表页',
        last,
        hot
    })  
}
exports.showBook = async (ctx, next) => {
    await ctx.render('book',{
        ...ctx.state,
        current: 'index',
        title:'书本页面'
    })
}