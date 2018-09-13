const {webSet} = require('../config');
const types = require('../model/types');
/**
 * 显示首页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showIndex = async (ctx, next) => {
    await ctx.render('index',{
        ...ctx.state,
        current:'index'
    })
}
/**
 * 显示章节页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showChapter = async (ctx, next) => {
    await ctx.render('chapter',{
        title:'章节页'
    })
}
/**
 * 列表页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showList = async (ctx, next) => {
    await ctx.render('list',{
        title:'列表页'
    })
}
exports.showBook = async (ctx, next) => {
    await ctx.render('book',{
        title:'书本页面'
    })
}