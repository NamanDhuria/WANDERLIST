const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
// auto define username , password ( hashing + salting ) + methods 

const userSchema = new Schema({
    email : {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);