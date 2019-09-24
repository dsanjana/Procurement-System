import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../App.css";

import Create from "./create.component";
import Edit from "./edit.component";
import Index from "./index.component";
import update from "./update.component";
import cart from "./cart.component";
import view from "./productview.component";
import cartedit from "./cartedit.component";
import sendtosenior from "./sendtosenior.component";
import finalbill from "./displaybill.component";
import payment from "./payment.component";
import SupplierCreate from "./supplier.create.component";
import SupplierIndex from "./supplier.index.component";

import SupplierEdit from "./supplier.edit.component";
import approvals from "./approvals.componene";
import history from "./history.component";
import drafts from "./drafts.component";
import inquiries from "./inquireies.component";
import ordereditems from "./ordereditems.component";
import EmployeeIndex from "./employee.index.component";
import EmployeeEdit from "./employee.edit.component";
import EmployeeCreate from "./employee.create.component";

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
import Login from "./login";
var BackImage = require("../images/construction-background.jpg");
var Logo = require("../images/Inspecoes-Tecnicas-Material-Icons_e7f135_256.png");

function Home() {
  return (
    <Router>
      <div
        className="Main1"
        style={{
          backgroundImage: "url(" + BackImage + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="Main2">
          <div className="level1">
            <div
              className="l1left"
              style={{
                backgroundImage: "url(" + Logo + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              {" "}
            </div>
            <div className="l1center">
              <div className="l1Top">
                {" "}
                <h2> Procurement Management System </h2>
              </div>
              <div className="l1Bottom">
                <nav className="navbar navbar-expand-lg ">
                  <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      <ul className="navbar-nav mr-auto">
                        <div class="dropdown">
                          <button class="dropbtn">Finance</button>
                          <div class="dropdown-content">
                            <li className="navbar-item2">
                              <Link to="/routes/register" className="nav-link1">
                                Add Rotes
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link
                                to="/transit/register"
                                className="nav-link1"
                              >
                                Add Transit
                              </Link>
                            </li>
                          </div>
                        </div>

                        <div class="dropdown">
                          <button class="dropbtn">TimeTables</button>
                          <div class="dropdown-content">
                            <li className="navbar-item2">
                              <Link
                                to="/ttables/register"
                                className="nav-link1"
                              >
                                Add TimeTables
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link to="/ttables/view" className="nav-link1">
                                View TimeTables
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link to="/ttables/reports" className="nav-link1">
                                View Reports
                              </Link>
                            </li>
                          </div>
                        </div>

                        <div class="dropdown">
                          <button class="dropbtn">Buses</button>
                          <div class="dropdown-content">
                            <li className="navbar-item2">
                              <Link to="/buses/register" className="nav-link1">
                                Add Buses
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link to="/buses/track" className="nav-link1">
                                Track Buses
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link to="/buses/view" className="nav-link1">
                                View Buses
                              </Link>
                            </li>
                            <li className="navbar-item2">
                              <Link
                                to="/drivers/register"
                                className="nav-link1"
                              >
                                Add Drivers
                              </Link>
                            </li>
                          </div>
                        </div>
                      </ul>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="l1right">
              <div className="l1rightTop">
                <nav className="navbar navbar-expand-lg ">
                  <div className="collpase navbar-collapse">
                    <Link to={"/users/login"} className="nav-link">
                      {" "}
                      Sign-in
                    </Link>
                    <Link to="/users/register" className="nav-link">
                      {" "}
                      Sign-up
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="level2">
            <div className="main-nav">
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/create"} className="nav-link">
                      Add Product{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/index"} className="nav-link">
                      Products Management
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/cart"} className="nav-link">
                      My Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/createsupplier"} className="nav-link">
                      Supplier
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/viewsupplier"} className="nav-link">
                      Supplier Details
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/approvals"} className="nav-link">
                      Approval Requests
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/history"} className="nav-link">
                      Orders
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/drafts"} className="nav-link">
                      Drafts
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/inquiries"} className="nav-link">
                      Inquiries
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/createemployee"} className="nav-link">
                      Employee Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/viewemployee"} className="nav-link">
                      Employee Details
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-body">
              <div className="container">
                {/* <Route path="/" exact component={Login} /> */}
                <Switch>
                <Route path="/users/login" component={Login} /> 
                  <Route exact path="/create" component={Create} />
                  <Route path="/edit/:id" component={Edit} />
                  <Route path="/index" component={Index} />
                  <Route path="/update" component={Index} />
                  <Route path="/cart" component={cart} />
                  <Route path="/view/:id" component={view} />
                  <Route path="/cartedit/:id" component={cartedit} />
                  <Route path="/sendtosenior" component={sendtosenior} />
                  <Route
                    path="/finalbill/:name/:email/:address"
                    component={finalbill}
                  />
                  <Route path="/payment" component={payment} />
                  <Route path="/createsupplier" component={SupplierCreate} />
                  <Route path="/viewsupplier" component={SupplierIndex} />
                  <Route path="/supplieredit/:id" component={SupplierEdit} />
                  <Route path="/approvals/" component={approvals} />
                  <Route path="/history/" component={history} />
                  <Route path="/drafts/" component={drafts} />
                  <Route path="/payment1/:id1" component={payment} />
                  <Route
                    path="/finalbill1/:name/:email/:address/:id5"
                    component={finalbill}
                  />
                  <Route path="/inquiries/:supplier" component={inquiries} />
                  <Route path="/ordereditems/:id" component={ordereditems} />
                  <Route path="/createemployee" component={EmployeeCreate} />
                  <Route path="/viewemployee" component={EmployeeIndex} />
                  <Route path="/employeeedit/:id" component={EmployeeEdit} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div className="level3">
          {/* <div class="container-fluid"> */}
          <footer class="p-3 mb-2 bg-dark text-white">
            <div class="container-fluid text-center text-md-left"></div>

            <div class="footer-copyright text-center py-3">
              © 2011 Sri Lanka Railways (SLR). All rights Reserved Sri Lanka
              Railways,Colombo 10, Sri Lanka
            </div>
          </footer>
        </div>
      </div>
      {/* </div> */}
    </Router>
  );
}

export default Home;
