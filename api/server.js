const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const businessRoute = require("./routes/business.route");
const supplierRoutes = require("./routes/supplier.routes");
const employeeRoutes = require("./routes/employee.route");
const loginRoutes = require("./routes/login.route");

mongoose.Promise = global.Promise;

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB, {useNewUrlParser: true}).then((res, err) => {
            if (err) return reject(err);
            console.log("Connected to database")
            resolve();
        })
    })
};

function close() {
    return mongoose.disconnect();
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/business", businessRoute);
app.use("/supplier", supplierRoutes);
app.use("/employee", employeeRoutes);

connect()
    .then(() => {
        app.listen(PORT, function () {
            console.log("Server is running on Port:", PORT);
        });
    })

module.exports = { connect, close, app };