var mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var schema = mongoose.Schema;



const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'items', // the name of our collection
};



var SchemaModel = new schema({

    firstName: {

        type: String,
        trim: true
    },
    lastName: {

        type: String,
        trim: true
    },
    phone: {

        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {

        type: String,
        trim: true
    },
    orders: [{
        type: schema.Types.ObjectId, ref: 'Orders'
    }],
    picture:{
        type:String,
        trim:true
    }

},{
    timestamps: true
},baseOptions)

// hash user password before saving into database
SchemaModel.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


var UserModel = mongoose.model('Users', SchemaModel);

module.exports = UserModel;