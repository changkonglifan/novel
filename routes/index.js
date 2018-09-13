const router = require('koa-router')();
const { webSet } = require('../config')
const appControl = require('../controls/app')
const indexControl = require('../controls')

/**
 * 展示首页
 */
router.get('/',appControl.getHeaderDatas,indexControl.showIndex)
/**
 * 章节页
 */
router.get('/chapter', indexControl.showChapter);
router.get('/chapter/:id', indexControl.showChapter);
/**
 * 列表页
 */
router.get('/list',indexControl.showList);
router.get('/list/:id', indexControl.showList);
/**
 * 小说页 
 */
router.get('/book/:id',indexControl.showBook)
module.exports = router
