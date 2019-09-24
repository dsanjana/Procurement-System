const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Invoice = new Schema({
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
    },

    date :{

        type:String
    },

    ino:{

        type:String

    },

    gtime:{


    },

    
    status:{

        type:String
        
    }


},{

    collection: 'invoice'
});

module.exports = mongoose.model('Invoice', Invoice);