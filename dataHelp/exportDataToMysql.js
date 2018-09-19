/**
 * 将mongodb数据转移到mysql
 */
const bookModel = require('../model/book');
const chapterModel = require('../model/chapter');
const { mysqldb } = require('../config');
const mysql = require('mysql');
var connection = mysql.createConnection(mysqldb);

async function getFullBookData() {
    return await bookModel.getAll();
}
async function getFullChapters(){
    return await chapterModel.getAll();
}
 async function getValuesStr (){
     const bookList = await getFullBookData();
     var str = '';
     bookList.forEach(element => {
         const ct = element.time.getFullYear() + '-' + (parseInt(element.time.getMonth()) + 1) + '-' + element.time.getDay() + " " + element.time.getHours() + ':' + element.time.getMinutes() + ":"+element.time.getSeconds();
         const cu = element.updateTime.getFullYear() + '-' + (parseInt(element.updateTime.getMonth()) + 1) + '-' + element.updateTime.getDay() + " " + element.updateTime.getHours() + ':' + element.updateTime.getMinutes() + ":"+element.updateTime.getSeconds();
         str += `('${element.id}','${element.name}','${element.author}','${ct}','${element.type}','${element.img}',${element.watch},'${cu}',${element.isRecommend}),`;
     });
     str = str.substr(0,str.length - 1);
     console.log(str);
     return str;
 }


async function saveBookData(){
    const str = await getValuesStr();
    const sql = `insert into books (bookId,name,author,time,type,img,watch,updateTime,isRecommend) values ${str} `
   //  query(sql);
   console.log(sql);
   connection.connect();
   connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results.length);
    console.log('保存成功')
    connection.end();
  });
}
// saveBookData();
async function getValuesStrChapters(){
    const chpaterList = await getFullChapters();
     var str = '';
     chpaterList.forEach(element => {
         const cr = element.createTime.getFullYear() + '-' + (parseInt(element.createTime.getMonth()) + 1) + '-' + element.createTime.getDay() + " " + element.createTime.getHours() + ':' + element.createTime.getMinutes() + ":"+element.createTime.getSeconds();
         const cu = element.updateTime.getFullYear() + '-' + (parseInt(element.updateTime.getMonth()) + 1) + '-' + element.updateTime.getDay() + " " + element.updateTime.getHours() + ':' + element.updateTime.getMinutes() + ":"+element.updateTime.getSeconds();
         str += `('${element.bookId}','${element.chpaterId}','${element.chapterName}','${element.chapterTxt}','${cr}','${cu}'),`;
     });
     str = str.substr(0,str.length - 1);
     console.log(str);
     return str;
}
async function saveChaptersData (){
    const str = await getValuesStrChapters();
    const sql = `insert into chapters 
                        (bookId,chpaterId,chapterName,chapterTxt,updateTime,createTime)
                        values ${str}`;
    connection.connect();
   connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results.length);
        console.log('保存成功')
        connection.end();
   })
}
saveChaptersData();