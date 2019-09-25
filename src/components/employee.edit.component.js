import React, { Component } from "react";
import axios from "axios";

export default class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeemployeeId = this.onChangeemployeeId.bind(this);
    this.onChangeemployeeName = this.onChangeemployeeName.bind(this);
    this.onChangesempAddress = this.onChangesempAddress.bind(this);
    this.onChangeemployeeEmail = this.onChangeemployeeEmail.bind(this);
    this.onChangeemployeemobile = this.onChangeemployeemobile.bind(this);
    this.onChangeemployeedescription = this.onChangeemployeedescription.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      employeeId: "",
      employeeName: "",
      empAddress: "",
      employeeEmail: "",
      employeemobile: "",
      employeedescription: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/employee/edit/" + this.props.match.params.id,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          employeeId: response.data.employeeId,
          employeeName: response.data.employeeName,
          empAddress: response.data.empAddress,
          employeeEmail: response.data.employeeEmail,
          employeemobile: response.data.employeemobile,
          employeedescription: response.data.employeedescription
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeemployeeId(e) {
    this.setState({
      employeeId: e.target.value
    });
  }

  onChangeemployeeName(e) {
    this.setState({
      employeeName: e.target.value
    });
  }

  onChangesempAddress(e) {
    this.setState({
      empAddress: e.target.value
    });
  }

  onChangeemployeeEmail(e) {
    this.setState({
      employeeEmail: e.target.value
    });
  }

  onChangeemployeemobile(e) {
    this.setState({
      employeemobile: e.target.value
    });
  }

  onChangeemployeedescription(e) {
    this.setState({
      employeedescription: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      employeeId: this.state.employeeId,
      employeeName: this.state.employeeName,
      empAddress: this.state.empAddress,
      employeeEmail: this.state.employeeEmail,
      employeemobile: this.state.employeemobile,
      employeedescription: this.state.employeedescription
    };

    axios
      .post(
        "http://localhost:4000/employee/update/" + this.props.match.params.id,
        obj,{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      }
      )
      .then(res => console.log(res.data));

    this.props.history.push("/viewemployee");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }} className="container">
        <br></br>
        <h3>Employee Registration</h3>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div class="form-group col-md-6">
            <label>Employee ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.employeeId}
              onChange={this.onChangeemployeeId}
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label>Employee Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.employeeName}
              onChange={this.onChangeemployeeName}
              pattern="[A-Za-z]{3,20}"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label>Employee Address </label>
            <input
              type="text"
              className="form-control"
              value={this.state.empAddress}
              onChange={this.onChangesempAddress}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              value={this.state.employeeEmail}
              onChange={this.onChangeemployeeEmail}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Mobile: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.employeemobile}
              onChange={this.employeemobile}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Designation</label>

            <select
              class="browser-default custom-select mb-4"
              id="inputState"
              value={this.state.employeedescription}
              onChange={this.onChangeemployeedescription}
              required
            >
              <option value="" selected>
                Choose option
              </option>
              <option value="staffmember">Staff Memeber</option>
              <option value="sstaffmember">Senior Staff Memeber</option>
              <option value="sitemanager">Site Manager</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add Deails"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
