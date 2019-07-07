const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    docNum:{type:Number},
    writerid:{type:String},
    writername:{type:String},
    desc:{type:String,default:''},
    rplNum:{type:Number,index:true}
})

const CommRpl=mongoose.model('Rpl',userSchema)
module.exports=CommRpl