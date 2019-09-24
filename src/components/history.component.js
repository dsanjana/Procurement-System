//View Credit card payment Form

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class history extends Component {
  constructor(props) {
    //this.onSubmit=this.onSubmit.bind(this);
    super(props);

    this.onChangestatus = this.onChangestatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeSupplier = this.onChangeSupplier.bind(this);
    this.onsearchsubmit = this.onsearchsubmit.bind(this);

    this.ondelete = this.ondelete.bind(this);

    this.state = {
      orders: [],
      status: "",
      search: [],
      suppliers: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/supplier")
      .then(response => {
        this.setState({ suppliers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/business/invoice")
      .then(response => {
        console.log(response.data);
        this.setState({
          orders: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangestatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onSubmit(e) {
    this.props.history.push("ordereditems/" + e.target.id);
  }

  onChangeSupplier(e) {
    this.setState({
      search: e.target.value
    });
  }

  ondelete(e) {
    axios
      .get("http://localhost:4000/business/pdelete/" + e.target.id)
      .then(response => {
        axios
          .get("http://localhost:4000/business/invoice")
          .then(response => {
            console.log(response.data);
            this.setState({
              orders: response.data
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onsearchsubmit(e) {
    axios
      .get("http://localhost:4000/business/invoice/" + this.state.search)
      .then(response => {
        this.setState({
          orders: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    this.state.x = 0;

    return (
      <div className="container">
          <br></br>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">Supplier :</label>
          <select
            id="inputState"
            className="form-control"
            value={this.state.search}
            onChange={this.onChangeSupplier}
          >
            <option value="uiui">Select a Supplier : </option>
            {this.state.suppliers.map(obj => {
              return (
                <option value={obj.supplierName}>{obj.supplierName}</option>
              );
            })}
          </select>
        </div>

        <button onClick={this.onsearchsubmit} className="btn btn-dark">
          Search
        </button>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Date/Time</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Description</th>
              <th>Quantities</th>
              <th colSpan="2">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((obj, index) => {
              return (
                <tr key={obj._id}>
                  <td>{obj.pid}</td>
                  <td>{obj.date}</td>
                  <td>{obj.pname}</td>
                  <td>{obj.psprice}</td>
                  <td>{obj.supplier}</td>
                  <td>{obj.description}</td>

                  <td>{obj.pqty}</td>
                  <div className="form-group"></div>
                  <td>{obj.status}</td>

                  <td>
                    <Link
                      to
                      onClick={this.onSubmit}
                      id={obj._id}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <Link
                      to
                      onClick={this.ondelete}
                      id={obj._id}
                      className="btn btn-danger"
                    >
                      delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
