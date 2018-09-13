const router = require('koa-router')()
const userControl = require('../controls/user');
router.prefix('/users')
/**
 * 登录页面
 */
router.get('/login', userControl.showLogin)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})



module.exports = router
