const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    docNum:{type:Number},
    writer:{type:String},
    desc:{type:String,default:''},
    rplNum:{type:Number,unique:true,index:true}
})

const CommRpl=mongoose.model('Rpl',userSchema)
module.exports=CommRpl