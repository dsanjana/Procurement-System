const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Employee = new Schema({

    employeeId:{
        type:String,
        required:  true
    },

    employeeName:{
        type: String
    },

    empAddress: {
        type: String
    },

    employeeEmail:{
        type: String,
        required:  true
    },

    employeePassword:{
        type: String,
        required:  true
    },

    employeemobile:{
        type: String
    },

    employeedescription: {
        type: String
    }
},{

        collection: 'employee'
});
    
    module.exports = mongoose.model('Employee', Employee);
