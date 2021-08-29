const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    photo: String,
    userName: String    

})

/* UserSchema.methods.encryptPassword = async password => {
    const salt =  await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
} */

const UserModel = mongoose.model('UserModel', UserSchema)
module.exports =  UserModel