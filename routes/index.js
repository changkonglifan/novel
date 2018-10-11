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
router.get('/chapter',appControl.getHeaderDatas, indexControl.showChapter);
router.get('/chapter/:id', appControl.getHeaderDatas, indexControl.showChapter);
/**
 * 列表页
 */
router.get('/list',appControl.getHeaderDatas, indexControl.showList);
router.get('/list/:id', appControl.getHeaderDatas, indexControl.showList);
/**
 * 小说页 
 */
router.get('/book/:bookId/:chapterId', appControl.getHeaderDatas,indexControl.showBook)
/**
 * 404
 */
router.get('/404', appControl.show404)
module.exports = router
