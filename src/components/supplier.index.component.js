import React, { Component } from "react";
import axios from "axios";
import SupplierTableRow from "./supplier.tablerow";

export default class SupplierIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { suppliers: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/supplier",{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({ suppliers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.suppliers.map(function(object, i) {
      return <SupplierTableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h3>Suppliers List</h3>
        <br></br>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Supplier Id</th>
              <th>Supplier Name</th>
              <th>Supplier Address</th>
              <th>Supplier Email</th>
              <th>Supplier Mobile</th>
              <th>Supplier Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
