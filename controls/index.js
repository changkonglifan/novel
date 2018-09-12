const {webSet} = require('../config');
/**
 * 显示首页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showIndex = async (ctx, next) => {
    await ctx.render('index',{
        title: webSet.title
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