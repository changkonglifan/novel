//配置文件

//MongoDB 配置文件
const mongodb = {
	port: 27017,//数据库端口
	host: 'localhost',//数据库地址
	collection:'novel',//数据库集合名（数据库名）
}
//mysql 配置
const mysql = {

}
//其他配置项
const webSet ={
	title: '楚奕小说',
	port: 80,//服务端口
	salt: 'caicai',//加密盐
	session:{
		secret: 'blog',
		key: 'blog',
		maxAge: 2592000000
    },
    pageSize: 10
}
module.exports = {
	mongodb,
	mysql,
	webSet
}