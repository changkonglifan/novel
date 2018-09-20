/**
 * 管理sql列表
 */
const sqlList = {
    GET_TYPES: 'select * from types',
    GET_RECOMMEND: 'select * from books where isRecommend = TRUE LIMIT 15',
    GET_BOOKS:'select * from books ORDER BY ? DESC LIMIT 15 ',
    GET_LAST:'select '
}

module.exports = sqlList;