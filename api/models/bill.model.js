const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Bill = new Schema({
    pid: {
        type: String
    },
    pname: {
        type: String
    },


    psprice: {
        type: String
    },

    pqty: {
        type: String
    },
    pcategory: {

        type:String

    },

    description:{

        type:String
    },

    pemail:{

        type:String
    },

    name:{

        type:String
    },

    address:{

        type:String
    },

    supplier:{

        type: String
    }


},{

    collection: 'approvals'
});

module.exports = mongoose.model('Bill', Bill);