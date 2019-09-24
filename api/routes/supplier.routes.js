// const nodemailer = require('nodemailer');

const nodemailer = require('nodemailer');

const express = require('express');
const supplierRoutes = express.Router();

let Supplier = require('../models/supplier.model');


  supplierRoutes.route('/add').post(function (req, res) {
    let supplier = new Supplier(req.body);
    supplier.save()
      .then(supplier => {
        res.status(200).json({'business': 'business in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });



supplierRoutes.route('/').get(function (req, res) {
  Supplier.find(function(err, suppliers){
  if(err){
    console.log(err);
  }
  else {
    res.json(suppliers);
  }
});
});


supplierRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Supplier.findById(id, function (err, supplier){
      res.json(supplier);
  });
});


//supplier search by name
supplierRoutes.route('/supplier/:name').get(function (req, res) {
    
  Supplier.findOne({supplierName:req.params.name}, function (err, supplier){
      res.json(supplier);
  });
});



// supplierRoutes.route('/update/:id').post(function (req, res) {
//     Supplier.findById(req.params.id, function(err, supliers) {
//         if (!supliers)
//             res.status(404).send("data is not found");
//         else {
//             supliers.supplierId=req.body.supplierId;
//             supliers.supplierName = req.body.supplierName;
//             supliers.sAddress=req.body.sAddress;
//             supliers.supplierEmail=req.body.supplierEmail;
//             supliers.suppliermobile=req.body.suppliermobile;
//             supliers.supplierdescription=req.body.supplierdescription;

//             Supplier.save().then(cart => {
//                 res.json('Update complete');
//             })
//                 .catch(err => {
//                     res.status(400).send("unable to update the database");
//                 });
//         }
//     });
// });



supplierRoutes.route('/update/:id').post(function (req, res) {
  Supplier.findById(req.params.id, function(err, supliers) {
  if (!supliers)
    res.status(404).send("data is not found");
  else {
    supliers.supplierId=req.body.supplierId;
    supliers.supplierName = req.body.supplierName;
    supliers.sAddress=req.body.sAddress;
    supliers.supplierEmail=req.body.supplierEmail;
    supliers.suppliermobile=req.body.suppliermobile;
    supliers.supplierdescription=req.body.supplierdescription;

    supliers.save().then(supliers => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});


supplierRoutes.route('/delete/:id').get(function (req, res) {
  Supplier.findByIdAndRemove({_id: req.params.id}, function(err, supliers){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});



var smtpTransport = nodemailer.createTransport({

  service:'gmail',
  host:'smtp.gmail.com',
  port:587,
  auth:{
      user:'fernandopumudu@gmail.com',
      pass:'Pabc@456'
  },
  tls:{rejectUnauthorized:false},
  debug:true
});


supplierRoutes.route('/send1').post(function(req,res) {
  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
      apiKey: '2e1b6d04',
      apiSecret: 'AbiQ7J15WKGnxQu0'
  });

  const from = 'Nexmo';
  const to = '+94764468944';
  const text = 'Hello Your Supplier is here';

  console.log("working sms");
  console.log("working sms");

  nexmo.message.sendSms(from, to, text)

});

supplierRoutes.route('/send').post(function(req,res) {
  console.log("start");


  var mailOptions = {
      to: req.body.supplierEmail,
      subject: "Supplier Details",
      text: "Your Reservation Completed Please Bring this as the confirmation"

  }

//check whether mail is working
  console.log(mailOptions);
  

  smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
          console.log(error+"not working");

      } else {
          console.log("Message sent Succesfully : " + response.message);

      }
  });

});


//inquiries


supplierRoutes.route('/sendin').post(function(req,res) {
  console.log("start");


  var mailOptions = {
      to: req.body.email,
      subject: "Supplier Details",
      text: req.body.ebody

  }

//check whether mail is working
  console.log(mailOptions);
  

  smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
          console.log(error+"not working");

      } else {
          console.log("Message sent Succesfully : " + response.message);

      }
  });

});

///requestin a bid
supplierRoutes.route('/sendbid/:mail').post(function(req,res) {
  console.log("start");

  let x="Product  : "+req.body.pname
  console.log(x)
  var mailOptions = {
      to: req.params.mail,
      subject: "Reagarding your Bid ",
      text: x.toString()

  }

//check whether mail is working
  console.log(mailOptions);
  

  smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
          console.log(error+"not working");

      } else {
          console.log("Message sent Succesfully : " + response.message);

      }
  });

});


///send orders
supplierRoutes.route('/sendo/:mail').post(function(req,res) {
  console.log("start");

  let x="Product  : "+req.body.pname+ " Address : "+req.body.address+" Qty  :"+req.body.pqty
  console.log(x)
  var mailOptions = {
      to: req.params.mail,
      subject: "order request",
      text: x.toString()

  }

//check whether mail is working
  console.log(mailOptions);
  

  smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
          console.log(error+"not working");

      } else {
          console.log("Message sent Succesfully : " + response.message);

      }
  });

});


module.exports = supplierRoutes;