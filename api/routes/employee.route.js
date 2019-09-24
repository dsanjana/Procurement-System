const nodemailer = require("nodemailer");

const express = require("express");
const employeeRoutes = express.Router();
const bcrypt = require("bcryptjs");

let Employee = require("../models/employee.model");

// employeeRoutes.route('/add').post(function (req, res) {
//     let employee = new Employee(req.body);
//     employee.save()
//       .then(employee => {
//         res.status(200).json({'employee': 'save in  successfully'});
//       })
//       .catch(err => {
//       res.status(400).send("unable to save to database");
//       });
//   });

employeeRoutes.route("/add").post(function(req, res) {

  // if (!req.isAuth) {
  //     throw new Error("User not authenticated")
  // }
  return Employee.findOne({ employeeEmail: req.body.employeeEmail })
    .then(user => {
      console.log(user)
      if (user) {
        throw new Error("User exist already");
      }
      return bcrypt.hash(req.body.employeePassword, 12);
    })
    .then(hasedPassword => {
      const employee = Employee({
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        empAddress: req.body.empAddress,
        employeeEmail: req.body.employeeEmail,
        employeePassword: hasedPassword,
        employeemobile: req.body.employeemobile,
        employeedescription: req.body.employeedescription
      });

      return employee.save().then(employee => {
        res.status(200).json({ employee: "save in  successfully" });
      });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

employeeRoutes.route("/").get(function(req, res) {
  Employee.find(function(err, employee) {
    if (err) {
      console.log(err);
    } else {
      res.json(employee);
    }
  });
});

employeeRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  Employee.findById(id, function(err, employee) {
    res.json(employee);
  });
});

employeeRoutes.route("/update/:id").post(function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    if (!employee) res.status(404).send("data is not found");
    else {
      employee.employeeId = req.body.employeeId;
      employee.employeeName = req.body.employeeName;
      employee.empAddress = req.body.empAddress;
      employee.employeeEmail = req.body.employeeEmail;
      employee.employeemobile = req.body.employeemobile;
      employee.employeedescription = req.body.employeedescription;

      employee
        .save()
        .then(employee => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

employeeRoutes.route("/delete/:id").get(function(req, res) {
  Employee.findByIdAndRemove({ _id: req.params.id }, function(err, employee) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "fernandopumudu@gmail.com",
    pass: "Pabc@456"
  },
  tls: { rejectUnauthorized: false },
  debug: true
});

employeeRoutes.route("/send").post(function(req, res) {
  console.log("start");

  var mailOptions = {
    to: req.body.employeeEmail,
    subject: "Employee Details",
    text: "Your Reservation Completed Please Bring this as the confirmation"
  };

  //check whether mail is working
  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error + "not working");
    } else {
      console.log("Message sent Succesfully : " + response.message);
    }
  });
});

module.exports = employeeRoutes;
