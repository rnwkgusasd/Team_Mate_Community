const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    userID: { type: String, unique: true, index: true },
    userPW : { type: String },
    likeDoc: [new mongoose.Schema({likeDocid: {type:String ,default: '' }})]
})
const UserModel = mongoose.model('UserModel', userSchema)
module.exports=UserModel