import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

export default class inquiries extends Component {
  constructor(props) {
    super(props);
    this.onChangeSupplier = this.onChangeSupplier.bind(this);

    this.sendsms = this.sendsms.bind(this);
    this.sendemail = this.sendemail.bind(this);

    this.onchangeemail = this.onchangeemail.bind(this);
    this.onchangesms = this.onchangesms.bind(this);

    this.state = {
      suppliers: [],
      ebody: "",
      sbody: "",
      supplier: ""
    };
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

  onchangeemail(e) {
    this.setState({
      ebody: e.target.value
    });
  }

  onchangesms(e) {
    this.setState({
      sbody: e.target.value
    });
  }

  sendemail(e) {
    // alert(this.props.match.params.supplier);
    axios
      .get(
        "http://localhost:4000/supplier/supplier/" +
          this.props.match.params.supplier,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
        const obj = {
          ebody: this.state.ebody,
          email: res.data.supplierEmail
        };

        // alert(""+res.data.supplierEmail+ "   " +this.state.ebody);

        axios
          .post("http://localhost:4000/supplier/sendin", obj,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
          .then(res => {})
          .catch(function(error) {
            console.log(error);
          });
        console.log(res.data);
      });

    //alert(this.state.email)
  }

  sendsms(e) {}

  onChangeSupplier(e) {
    this.setState({
      supplier: e.target.value
    });
  }

  render() {
    return (
      <div class="form-group">
        <h1>Make Inquiries</h1>

        <label>Supplier:{this.props.match.params.supplier} </label>

        <br />
        <br />
        <label for="exampleFormControlTextarea1">Message Body:</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v
          value={this.state.email}
          onChange={this.onchangeemail}
        ></textarea>

        <br />

        <button
          type="button"
          class="btn btn-secondary"
          onClick={this.sendemail}
        >
          Send E-mail
        </button>

        <br />
      </div>
    );
  }
}
