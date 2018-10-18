const sqlList = require('../model/sqlList');
const mysqlHelp = require('../dataHelp/mysqlHelp');
const URL = require('url');
const moment = require('moment');
const util = require('../util')
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
        title:bookInfo[0].name,
        bookInfo: bookInfo[0],
        chapters,
        lastChapter: chapters[chapters.length - 1],
        moment
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
    const last = await mysqlHelp.query(sqlList.GET_BOOKS_LAST,[typeName[0].typeName,'time',14]);
    const hot = await mysqlHelp.query(sqlList.GET_BOOKS_BY_TYPENAME, [typeName[0].typeName,'watch', 15]);
    await ctx.render('list',{
        ...ctx.state,
        current: 'index',
        title:'列表页',
        last,
        hot,
        current: id 
    })  
}
/**
 * 阅读页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showBook = async (ctx, next) => {
    const bookId = ctx.params.bookId;
    const chapterId = ctx.params.chapterId;
    const bookInfo = await mysqlHelp.query(sqlList.GET_BOOK_INFO,[bookId]);
    const chapter = await mysqlHelp.query(sqlList.GET_CHAPTER_TXT,[bookId,chapterId]); 
    const type = await mysqlHelp.query(sqlList.GET_TYPE_BY_NAME,[bookInfo[0].type]);
    let chapterTxt = chapter[0].chapterTxt.replace('Ps:书友们，我是执笔天涯，推荐一款免费小说App，支持小说下载、听书、零广告、多种阅读模式', '').replace('请您关注微信公众号：dazhuzaiyuedu（长按三秒复制）书友们快关注起来吧！', '');
    chapterTxt = util.ToCDB(chapterTxt);
    chapterTxt = chapterTxt.replace(/[\'\"\\\/\b\f\n\r\t]/g, '').replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/g, '').replace(/[u4E00-u9FA5]/g,'<br/>');
    await ctx.render('book',{
        ...ctx.state,
        current: 'index',
        title: bookInfo[0].name + chapter[0].chapterName,
        chapter: chapter[0],
        bookInfo: bookInfo[0],
        chapterTxt,
        type: type[0]
    })
}