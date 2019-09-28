const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
  pid: {
    type: String,
    required:true
  },
  pname: {
    type: String,
    required:true
  },
  pbprice: {
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

  oid:{

    type:String
  },

  supplier:{

    type: String,
    required:true
  }


},{

    collection: 'business'
});

module.exports = mongoose.model('Business', Business);