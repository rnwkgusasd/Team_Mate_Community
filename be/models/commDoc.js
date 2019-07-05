const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    title:{ type: String, default: '' },
    desc:{ type: String, default: '' },
    writer:{ type: String },
    viewCnt:{ type: Number, default:0 },
    likeCnt:{ type: Number, default:0 },
    docNum:{ type: Number, unique: true, index: true }
})

const commDoc=mongoose.model('commDoc',userSchema)

module.exports=commDoc