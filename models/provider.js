var mongoose = require("mongoose")

const User = require('./UserModel'); // we have to make sure our Book schema is aware of the Base schema

const Provider = User.discriminator('Provider', new mongoose.Schema({
        societe: {type: String, required: true},
        date: {type: Date, required: true}
    })
);

module.exports = mongoose.model('Provider');