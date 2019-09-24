const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Employee = new Schema({

    employeeId:{
        type:String
    },

    employeeName:{
        type: String
    },

    empAddress: {
        type: String
    },

    employeeEmail:{
        type: String 
    },

    employeePassword:{
        type: String 
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
