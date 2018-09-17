const types = require('../model/types');
const books = require('../model/book');
/**
 * 显示首页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showIndex = async (ctx, next) => {
    const recommend = await books.getRecommend();//推荐
    const last = await books.getLastUpdate();//最近更新
    const hot = await books.getHotList();//热门列表
    await ctx.render('index',{
        ...ctx.state,
        current:'index',
        recommend,
        last,
        hot
    })
}
/**
 * 显示章节页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showChapter = async (ctx, next) => {
    await ctx.render('chapter',{
        ...ctx.state,
        current: 'index',
        title:'章节页'
    })
}
/**
 * 列表页
 * @param {*} ctx 
 * @param {*} next 
 */
exports.showList = async (ctx, next) => {
    const id = ctx.params.id;
    const type = await types.getType({typeId: id}); 
    const params = {
        typeName: type[0].typeName,
        page: 1
    }
    const list = await books.getBookListByTypeName(params);
    await ctx.render('list',{
        ...ctx.state,
        current: 'index',
        title:'列表页',

    })
}
exports.showBook = async (ctx, next) => {
    await ctx.render('book',{
        ...ctx.state,
        current: 'index',
        title:'书本页面'
    })
}