import React, { Component } from "react";
import axios from "axios";

export default class SupplierEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangesupplierId = this.onChangesupplierId.bind(this);
    this.onChangesupplierName = this.onChangesupplierName.bind(this);
    this.onChangesAddress = this.onChangesAddress.bind(this);
    this.onChangesupplierEmail = this.onChangesupplierEmail.bind(this);
    this.suppliermobile = this.suppliermobile.bind(this);
    this.onChangesupplierdescription = this.onChangesupplierdescription.bind(
      this
    );

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      supplierId: "",
      supplierName: "",
      sAddress: "",
      supplierEmail: "",
      suppliermobile: "",
      supplierdescription: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/supplier/edit/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          supplierId: response.data.supplierId,
          supplierName: response.data.supplierName,
          sAddress: response.data.sAddress,
          supplierEmail: response.data.supplierEmail,
          suppliermobile: response.data.suppliermobile,
          supplierdescription: response.data.supplierdescription
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangesupplierId(e) {
    this.setState({
      supplierId: e.target.value
    });
  }

  onChangesupplierName(e) {
    this.setState({
      supplierName: e.target.value
    });
  }

  onChangesAddress(e) {
    this.setState({
      sAddress: e.target.value
    });
  }

  onChangesupplierEmail(e) {
    this.setState({
      supplierEmail: e.target.value
    });
  }

  suppliermobile(e) {
    this.setState({
      suppliermobile: e.target.value
    });
  }

  onChangesupplierdescription(e) {
    this.setState({
      supplierdescription: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      supplierId: this.state.supplierId,
      supplierName: this.state.supplierName,
      sAddress: this.state.sAddress,
      supplierEmail: this.state.supplierEmail,
      suppliermobile: this.state.suppliermobile,
      supplierdescription: this.state.supplierdescription
    };

    axios
      .post(
        "http://localhost:4000/supplier/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.props.history.push("/viewsupplier");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }} className="container">
        <br></br>
        <h3>Update Suppliers</h3>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div class="form-group col-md-6">
            <label>Supplier ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.supplierId}
              onChange={this.onChangesupplierId}
            />
          </div>
          <div class="form-group col-md-6">
            <label>Supplier Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.supplierName}
              onChange={this.onChangesupplierName}
            />
          </div>
          <div class="form-group col-md-6">
            <label>Address </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sAddress}
              onChange={this.onChangesAddress}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              value={this.state.supplierEmail}
              onChange={this.onChangesupplierEmail}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Mobile: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.suppliermobile}
              onChange={this.suppliermobile}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.supplierdescription}
              onChange={this.onChangesupplierdescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Details"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
