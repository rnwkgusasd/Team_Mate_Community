var express=require('express');
var createError=require('http-errors');
var router=express.Router();

module.exports=router;

router.get('/',function(req,res,next){
    res.send({msg:'Linked rpl'})
})