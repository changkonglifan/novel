const { webSet } = require('../config');
const types = require('../model/types');
/**
 * 查询头部相关数据
 * @param {*} ctx 
 * @param {*} next 
 */
exports.getHeaderDatas = async (ctx,next)=>{
    const typesData = await types.getAllTypes();
    ctx.state.title = webSet.title;
    ctx.state.types = typesData;
    await next();
}