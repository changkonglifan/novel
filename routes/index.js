const router = require('koa-router')();
const { webSet } = require('../config')
const indexControl = require('../controls')

/**
 * 展示首页
 */
router.get('/',indexControl.showIndex)
/**
 * 章节页
 */
router.get('/chapter', indexControl.showChapter);
router.get('/chapter/:id', indexControl.showChapter);
/**
 * 列表页
 */
router.get('/list',indexControl.showList);
module.exports = router
