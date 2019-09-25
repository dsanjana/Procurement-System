import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

export default class ordereditems extends Component {
  constructor(props) {
    super(props);

    this.onchangestatus = this.onchangestatus.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    //this.oncontact=this.oncontact.bind(this);

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
      supplier: "",
      supplier: "",
      status: "",
      ino: "",
      date: "",

      cstatus: ""
    };
    axios
      .get(
        "http://localhost:4000/business/invoiceid/" + this.props.match.params.id,{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      }
      )
      .then(response => {
        console.log(response.data);

        this.setState({
          status: response.data.status,
          ino: response.data.ino,
          date: response.data.date,

          pbprice: response.data.pbprice,

          psprice: response.data.psprice,
          pqty: response.data.pqty,
          supplier: response.data.supplier,
          pname: response.data.pname,
          description: response.data.description,
          pcategory: response.data.pcategory
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onchangestatus(e) {
    this.setState({
      cstatus: e.target.value
    });
  }

  onsubmit(e) {
    alert(this.props.match.params.id);
    axios
      .post(
        "http://localhost:4000/business/statusupdate/" +
          this.props.match.params.id +
          "/" +
          this.state.cstatus,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Status &nbsp; :&nbsp;{this.state.status}</h1>
        <h6>Order Id &nbsp; :&nbsp;{this.state.ino}</h6>
        <h6>Order Time &nbsp; :&nbsp;{this.state.date}</h6>
        <br />

        <h2>Summary</h2>
        <h6>Supplier &nbsp; &nbsp; {this.state.supplier} </h6>
        <h6>qty &nbsp; &nbsp; {this.state.pqty}</h6>
        <h6> description &nbsp; :&nbsp;{this.state.description}</h6>

        <br></br>
        <h5>
          Price : &nbsp; &nbsp;{" "}
          {parseInt(this.state.psprice) * parseInt(this.state.pqty)}{" "}
        </h5>

        <div class="form-group col-md-6">
          <select value={this.state.value} onChange={this.onchangestatus} className="form-control">
            <option value="Select ">Select</option>
            <option value="Pending">Pending</option>
            <option value="Recieved">Recieved</option>
          </select>
        </div>

        <Link to onClick={this.onsubmit} className="btn btn-danger">
          Change
        </Link>&nbsp;
        <Link
          to={"/inquiries/" + this.state.supplier}
          className="btn btn-primary"
        >
          Contact
        </Link>
      </div>
    );
  }
}
