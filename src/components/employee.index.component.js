import React, { Component } from "react";
import axios from "axios";
import EmployeeTableRow from "./employee.tablerow";

export default class EmployeeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/employee",{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.employees.map(function(object, i) {
      return <EmployeeTableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h3>Employee List</h3>
        <br></br>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Employee Address</th>
              <th>Employee Email</th>
              <th>Employee Mobile</th>
              <th>Employee Designation</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
