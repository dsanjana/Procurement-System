import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";
import App from "../App";
import "../App.css";

var BackImage = require("../images/office-building-construction-site_free_stock_photos_picjumbo_DSC01125-1570x1047.jpg");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubmissionPassEmail = this.onChangeSubmissionPassEmail.bind(
      this
    );
    this.onChangeSubmissionPassPassword = this.onChangeSubmissionPassPassword.bind(
      this
    );
    this.OnLogin = this.OnLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      pass_email: "",
      pass_password: ""
    };
  }

  onChangeSubmissionPassEmail(e) {
    this.setState({
      pass_email: e.target.value
    });
  }
  onChangeSubmissionPassPassword(e) {
    this.setState({
      pass_password: e.target.value
    });
  }

  OnLogin(e) {
    e.preventDefault();

    const obj = {
      email: this.state.pass_email,
      passwrd: this.state.pass_password
    };

    axios
      .post("http://localhost:4000/login/loginUser", obj)
      .then(res => {
        if (!res.data.message) {
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userRole", res.data.typeOfEmp)
            sessionStorage.setItem("userName", res.data.name)
            sessionStorage.setItem("idNumber", res.data.idNumber)
            sessionStorage.setItem("email", res.data.email)
          alert(sessionStorage.getItem("token"));
          alert(sessionStorage.getItem("userId"));
          alert(sessionStorage.getItem("userRole"));
          alert(sessionStorage.getItem("userName"));
          alert(sessionStorage.getItem("idNumber"));
          alert(sessionStorage.getItem("email"));

          this.props.history.push("/home");
        } else {
          alert("guyegfegfeyufgeyfgefgefgegfe");
          throw new Error("I meant to blow up here.");
        }
      })
      .catch(err => {});
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div
        className="LoginPage"
        style={{
          height: 800,
          backgroundPosition: "center",
          backgroundImage: "url(" + BackImage + ")",
          backgroundRepeat: "no-repeat",
          flex: 1,
          paddingTop: 70
        }}
      >
        <div className="formContainer" style={{ marginTop: 10 }}>
          <div className="formWrapper">
            <h3>Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label> Email: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.pass_email}
                  onChange={this.onChangeSubmissionPassEmail}
                />
              </div>
              <div className="form-group">
                <label> Password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.pass_password}
                  onChange={this.onChangeSubmissionPassPassword}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                  onClick={this.OnLogin}
                />
              </div>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item2">
                {" "}
                <Link to="/users/register" className="nav-link">
                  {" "}
                  Dont have an account? Sign Up Here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
