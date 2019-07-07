const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    title:{ type: String, default: '' },
    desc:{ type: String, default: '' },
    writerid:{ type: String },
    writer:{ type: String },
    docNum:{ type: Number, default:0 },
    viewCnt:{ type: Number, default:0 },
    likeCnt:{ type: Number, default:0 }
})

const commDoc=mongoose.model('commDoc',userSchema)

module.exports=commDoc