/**
 * 管理sql列表
 */
const sqlList = {
    GET_TYPES: 'select * from types',
    GET_RECOMMEND: 'select * from books where isRecommend = TRUE LIMIT 15',
    GET_BOOKS:'select * from books ORDER BY ? DESC LIMIT ? ',
    GET_LAST:'select A.name,A.bookId,A.author,A.type,B.chapterId,B.chapterName from books as A RIGHT JOIN (select C.bookId,C.chapterName,C.chapterId,max(C.updateTime) from chapters as C GROUP BY C.bookId) as B on A.bookId = B.bookId LIMIT 10',
    GET_BOOK_INFO: 'SELECT * FROM BOOKS WHERE bookId = ? ',
    GET_CHAPTERS_LIST: 'SELECT chapterId,chapterName,createTime FROM chapters WHERE bookId = ?',
    GET_TYPE_NAME_BY_ID: `SELECT typeName FROM types WHERE typeId = ?`,
    GET_BOOKS_BY_TYPENAME: 'SELECT id,bookId,name,author,time,watch FROM books WHERE type = ?  ORDER BY ?  LIMIT ?',
    GET_BOOKS_LAST:'SELECT A.name,A.bookId,A.author,A.type,B.chapterId,B.chapterName,A.time from books as A LEFT JOIN (select C.bookId,C.chapterName,C.chapterId,max(C.updateTime) FROM chapters as C GROUP BY C.bookId) as B on A.bookId = B.bookId WHERE type = ?  ORDER BY ? LIMIT ?',
    GET_CHAPTER_TXT: 'SELECT chapterName,chapterTxt FROM chapters WHERE bookId = ? AND chapterId = ?'
}

module.exports = sqlList;