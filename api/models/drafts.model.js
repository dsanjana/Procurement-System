const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Drafts = new Schema({
    pid: {
        type: String,
        required:  true
    },
    pname: {
        type: String,
        required:  true
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

    total:{

        type:String

    },

    ltype:{

        type: String
    }


},{

    collection: 'drafts'
});

module.exports = mongoose.model('Drafts', Drafts);