const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    title:{type:String,default:''},
    desc:{type:String,default:''},
    author:{type:String},
    docNum:{type:Number},
    viewCnt:{type:Number,default:0},
    likeCnt:{type:Number,default:0}

})

const commDoc=mongoose.model('commDoc',userSchema)

module.exports=commDoc