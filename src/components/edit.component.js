import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangepid = this.onChangepid.bind(this);
    this.onChangepname = this.onChangepname.bind(this);
    this.onChangepbprice = this.onChangepbprice.bind(this);
    this.onChangepsprice = this.onChangepsprice.bind(this);
    this.onChangepcategory = this.onChangepcategory.bind(this);
    this.onChangepqty = this.onChangepqty.bind(this);
    this.onChangesupplier = this.onChangesupplier.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      pid: "",
      pname: "",
      pbprice: "",
      psprice: "",
      pcategory: "",
      pqty: "",
      description: "",
      val: "",
      supplier: [],
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
      .get("http://localhost:4000/business/edit/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);

        this.setState({
          pid: response.data.pid,
          pname: response.data.pname,
          pbprice: response.data.pbprice,
          psprice: response.data.psprice,
          pcategory: response.data.pcategory,
          pqty: response.data.pqty,
          description: response.data.description,
          supplier: response.data.supplier
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangepid(e) {
    this.setState({
      pid: e.target.value
    });
  }
  onChangepname(e) {
    this.setState({
      pname: e.target.value
    });
  }
  onChangepbprice(e) {
    this.setState({
      pbprice: e.target.value
    });
  }

  onChangepsprice(e) {
    this.setState({
      psprice: e.target.value
    });
  }

  onChangepqty(e) {
    this.setState({
      pqty: e.target.value
    });
  }

  onChangepcategory(e) {
    this.setState({
      pcategory: e.target.value
    });
  }

  onChangedescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangesupplier(e) {
    this.setState({
      supplier: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      pid: this.state.pid,
      pname: this.state.pname,
      pbprice: this.state.pbprice,
      psprice: this.state.psprice,
      pqty: this.state.pqty,
      pcategory: this.state.pcategory,
      description: this.state.description,
      supplier: this.state.supplier
    };

    alert(this.props.match.params.id);

    axios
      .post(
        "http://localhost:4000/business/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      pid: "",
      pname: "",
      pbprice: "",
      psprice: "",
      pqty: "",
      pcategory: "",
      description: "",
      supplier: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Add New Product</h3>
        <form onSubmit={this.onSubmit}>
          <div class="form-group col-md-6">
            <label>Product ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.pid}
              onChange={this.onChangepid}
            />
          </div>
          <div class="form-group col-md-6">
            <label>Product Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.pname}
              onChange={this.onChangepname}
            />
          </div>
          <div class="form-group col-md-6">
            <label>Buying Price: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.pbprice}
              onChange={this.onChangepbprice}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Selling Price: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.psprice}
              onChange={this.onChangepsprice}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangedescription}
            />
          </div>

          <div class="form-group col-md-4">
            <label>Category: </label>
            <select value={this.state.value} onChange={this.onChangepcategory} className="form-control">
              <option value="x">x</option>
              <option value="y">y</option>
              <option value="z">z</option>
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Quantity: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.pqty}
              onChange={this.onChangepqty}
            />
          </div>

          <div class="form-group col-md-4">
          <label>Supplier: </label>
          <select value={this.state.value} onChange={this.onChangesupplier} className="form-control">
            <option value="uiui">"Select a Supplier"</option>
            {this.state.suppliers.map(obj => {
              return (
                <option value={obj.supplierName}>{obj.supplierName}</option>
              );
            })}
          </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              onClick={this.onSubmit}
              value="Update Details"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
