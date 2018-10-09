const { webSet } = require('../config');
// const types = require('../model/types');
const mysqlHelp = require('../dataHelp/mysqlHelp');
const sqlList = require('../model/sqlList');
/**
 * 查询头部相关数据
 * @param {*} ctx 
 * @param {*} next 
 */
exports.getHeaderDatas = async (ctx,next)=>{
    // const typesData = await types.getAllTypes();
    const typesData = await mysqlHelp.query(sqlList.GET_TYPES,{});
    ctx.state.title = webSet.title;
    ctx.state.types = typesData;
    await next();
}
/**
 * 404
 * @param {*} ctx 
 * @param {*} next 
 */
exports.show404 = async (ctx,next) => {
    await ctx.render('404',{ title: '404' } )
}