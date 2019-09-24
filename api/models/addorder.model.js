const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Addorder = new Schema({
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

    supplier:{
        type:String
    }

},{

    collection: 'addorder'
});

module.exports = mongoose.model('Addorder', Addorder);