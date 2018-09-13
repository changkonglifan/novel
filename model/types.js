const mongoose = require('../dataHelp/mongodb');
const schema = mongoose.Schema;

const typeSchema = new schema({
    typeName: String,//类型名
    typeId: String//类型id
})

//定义model
var typeModel = mongoose.model('types', typeSchema);
const typeObj = {};
/**
 * 查询所有的类型
 */
typeObj.getAllTypes = async ()=>{
    return await typeModel.find();
}

module.exports = typeObj;