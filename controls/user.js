/**
 * 用户相关操作
 */

exports.showLogin = async (ctx, next) => {
    await ctx.render('login',{
        title:'登录'
    })
}