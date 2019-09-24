const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Supplier = new Schema({

    supplierId:{
        type:String
    },

    supplierName:{
        type: String
    },

    sAddress: {
        type: String
    },

    supplierEmail:{
        type: String 
    },

    suppliermobile:{
        type: String
    },

    supplierdescription: {
        type: String
    }
},{

        collection: 'supplier'
});
    
    module.exports = mongoose.model('Supplier', Supplier);
