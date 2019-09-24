import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

export default class productview extends Component {
  constructor(props) {
    super(props);

    this.addtocart = this.addtocart.bind(this);
    this.onchangeqty = this.onchangeqty.bind(this);

    this.state = {
      pid: "",
      pname: "",
      pbprice: "",
      psprice: "",
      pcategory: "",
      pqty: "",
      description: "",
      sqty: "",
      val: "",
      supplier: ""
    };
    axios
      .get(
        "http://localhost:4000/business/cartsearch_id/" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(response.data.pid);
        //alert(this.props.match.params.id)

        this.setState({
          pid: response.data.pid,
          pname: response.data.pname,
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

  addtocart(e) {
    const obj = {
      pid: this.state.pid,
      pname: this.state.pname,

      psprice: this.state.psprice,
      pcategory: this.state.pcategory,
      pqty: this.state.pqty,
      description: this.state.description,
      supplier: this.state.supplier
    };

    alert(this.state.pqty);

    axios
      .post(
        "http://localhost:4000/business/cartupdate/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
      });
  }

  onchangeqty(e) {
    this.setState({
      pqty: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Product &nbsp; :&nbsp;{this.state.pname}</h1>
        <h6>Item Description &nbsp; :&nbsp;{this.state.description}</h6>
        <h6>Available Quantity &nbsp; :&nbsp;{this.state.pname}</h6>
        <br />
        <h5>Price &nbsp; &nbsp; {this.state.psprice} </h5>
        <h5>Supplier &nbsp; &nbsp; {this.state.supplier} </h5>

        <div className="form-group">
          <label>Quantity </label>
          <input
            type="number"
            className="form-control"
            aria-describedby="passwordHelpInline"
            value={this.state.pqty}
            onChange={this.onchangeqty}
          />
        </div>

        <td>
          {" "}
          <Link to onClick={this.addtocart} className="btn btn-primary">
            Update
          </Link>
        </td>
      </div>
    );
  }
}
