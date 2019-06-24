const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    docNum:{type:Number,unique:true,index:true},
    writer:{type:String},
    desc:{type:String,default:''},
    rplNum:{type:Number}
})

const Rpl=mongoose.model('Rpl',userSchema)
module.exports(Rpl)