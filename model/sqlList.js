/**
 * 管理sql列表
 */
const sqlList = {
    GET_TYPES: 'select * from types',
    GET_RECOMMEND: 'select * from books where isRecommend = TRUE LIMIT 15',
    GET_BOOKS:'select * from books ORDER BY ? DESC LIMIT ? ',
    GET_LAST:' select A.name,A.bookId,A.author,A.type,B.chapterId,B.chapterName from books as A RIGHT JOIN (select C.bookId,C.chapterName,C.chapterId,max(C.updateTime) from chapters as C GROUP BY C.bookId) as B on A.bookId = B.bookId LIMIT 10'
}

module.exports = sqlList;