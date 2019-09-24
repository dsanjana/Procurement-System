import React from "react";
import logo from "./logo.svg";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Create from "./components/create.component";
import Edit from "./components/edit.component";
import Index from "./components/index.component";
import update from "./components/update.component";
import cart from "./components/cart.component";
import view from "./components/productview.component";
import cartedit from "./components/cartedit.component";
import sendtosenior from "./components/sendtosenior.component";
import finalbill from "./components/displaybill.component";
import payment from "./components/payment.component";
import SupplierCreate from "./components/supplier.create.component";
import SupplierIndex from "./components/supplier.index.component";
import SupplierEdit from "./components/supplier.edit.component";
import approvals from "./components/approvals.componene";
import history from "./components/history.component";
import drafts from "./components/drafts.component";
import inquiries from "./components/inquireies.component";
import ordereditems from "./components/ordereditems.component";
import EmployeeIndex from "./components/employee.index.component";
import EmployeeEdit from "./components/employee.edit.component";
import EmployeeCreate from "./components/employee.create.component";
import "./App.css";
import { Component } from "react";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

import SearchField from "react-search-field";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Home from "./components/home";

var BackImage = require("./images/juan-encalada-6mcVaoGNz1w-unsplash.jpg");
var Logo = require("./images/bus.png");

function App() {
  return (
    <div>
      <Router>
        <div>
          <div>{Login}</div>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          {/* <Route exact path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/index" component={Index} />
          <Route path="/update" component={Index} />
          <Route path="/cart" component={cart} />
          <Route path="/view/:id" component={view} />
          <Route path="/cartedit/:id" component={cartedit} />
          <Route path="/sendtosenior" component={sendtosenior} />
          <Route path="/finalbill/:name/:email/:address" component={finalbill}/>
          <Route path="/payment" component={payment} />
          <Route path="/createsupplier" component={SupplierCreate} />
          <Route path="/viewsupplier" component={SupplierIndex} />
          <Route path="/supplieredit/:id" component={SupplierEdit} />
          <Route path="/approvals/" component={approvals} />
          <Route path="/history/" component={history} />
          <Route path="/drafts/" component={drafts} />
          <Route path="/payment1/:id1" component={payment} />
          <Route path="/finalbill1/:name/:email/:address/:id5" component={finalbill}/>
          <Route path="/inquiries/:supplier" component={inquiries} />
          <Route path="/ordereditems/:id" component={ordereditems} />
          <Route path="/createemployee" component={EmployeeCreate} />
          <Route path="/viewemployee" component={EmployeeIndex} />
          <Route path="/employeeedit/:id" component={EmployeeEdit} /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
