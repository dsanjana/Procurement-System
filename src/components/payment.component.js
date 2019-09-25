//View Credit card payment Form

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonEmail = this.onChangePersonEmail.bind(this);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonaddress = this.onChangePersonaddress.bind(this);
    this.onChangeCardno = this.onChangeCardno.bind(this);
    this.onChangePersonCvc = this.onChangePersonCvc.bind(this);
    this.onChangeExpiredate = this.onChangeExpiredate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.state = {
      business: [],

      email: "",
      name: "",
      address: "",
      items: [],
      cvc: "",
      cardno: "",
      expiredate: "",
      x: 0,
      xid: this.props.match.params.id1
    };
  }

  componentDidMount() {
    if (this.props.match.params.id1 > 5) {
      axios
        .get(
          "http://localhost:4000/business/drafts/" + this.props.match.params.id1,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }
        )

        .then(response => {
          console.log(response.data);
          this.setState({
            items: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .get("http://localhost:4000/business/items",{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response.data);
          this.setState({
            items: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  onChangePersonEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePersonName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePersonaddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeCardno(e) {
    this.setState({
      cardno: e.target.value
    });
  }

  onChangePersonCvc(e) {
    this.setState({
      cvc: e.target.value
    });
  }

  onChangeExpiredate(e) {
    this.setState({
      expiredate: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    let cur = Date.now();

    this.state.items.map(mobj => {
      let x = "Ordered";

      const obj = {
        pid: mobj.pid,
        pname: mobj.pname,
        psprice: mobj.psprice,
        pqty: mobj.pqty,
        pcategory: mobj.pcategory,
        description: mobj.description,
        pemail: this.state.email,
        name: this.state.name,
        address: this.state.address,
        supplier: mobj.supplier,

        ino: cur,

        date:
          date +
          "/" +
          month +
          "/" +
          year +
          " :" +
          hours +
          "/" +
          min +
          "/" +
          sec,
        status: x
      };

      // alert(mobj.supplier)
      axios
        .get("http://localhost:4000/supplier/supplier/" + mobj.supplier,{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);

          axios
            .post(
              "http://localhost:4000/supplier/sendo/" + res.data.supplierEmail,
              obj,{headers: {
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
              }
            }
            )
            .then(res => {
              alert("" + res.data.supplierEmail + "   " + mobj.pqty);
            })
            .catch(function(error) {
              console.log(error);
            });

          //alert(""+res.data.supplierEmail+ "   " +mobj.pqty);
        });

      axios.post("http://localhost:4000/business/invoice", obj,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    }).then(res => {
        console.log(res.data);

        if (this.props.match.params.id1 > 5) {
          //alert(this.props.match.params.id1)

          this.props.history.push(
            "/finalbill1/" +
              this.state.name +
              "/" +
              this.state.email +
              "/" +
              this.state.address +
              "/" +
              this.props.match.params.id1
          );
        } else {
          // alert("Order Has been Succeeded !");
          this.props.history.push(
            "/finalbill/" +
              this.state.name +
              "/" +
              this.state.email +
              "/" +
              this.state.address
          );
        }
      });
    });
  }

  onSubmit2(e) {
    e.preventDefault();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    let cur = Date.now();

    this.state.items.map(mobj => {
      const obj = {
        pid: mobj.pid,
        pname: mobj.pname,
        psprice: mobj.psprice,
        pqty: mobj.pqty,
        pcategory: mobj.pcategory,
        description: mobj.description,
        pemail: this.state.email,
        name: this.state.name,
        address: this.state.address,
        supplier: mobj.supplier,

        ino: cur,
        date: date + "/" + month + "/" + year,
        total: this.state.x,
        ltype: "Manager"
      };

      // alert(mobj.supplier)

      axios.post("http://localhost:4000/business/drafts", obj,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    }).then(res => {
        console.log(res.data);

        //alert("Order Has been drafted !");
      });
    });
  }

  render() {
    this.state.x = 0;

    return (
      <div style={{ marginTop: 10 }}>
        <div class="container">
          {this.state.items.map(obj => {
            //let y=parseFloat(this.state.x);
            //let z=obj.psprice;
            this.state.x = this.state.x + parseFloat(obj.psprice) * obj.pqty;

            return (
              <div>
                <p>Product: &nbsp; {obj.pname}</p>
                <p>ID: &nbsp; {obj.pid}</p>
                <p> Quantity: &nbsp; {obj.pqty}</p>
                <p> Price: &nbsp; {obj.psprice}</p>
                <p>Supplier: &nbsp; {obj.supplier}</p>
                <br />
              </div>
            );
          })}

          <h4> Sum: &nbsp; {this.state.x}</h4>
          <br />

          <form>
            <div class="form-group col-md-6">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangePersonEmail}
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label>Full Name </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangePersonName}
                required
              />
            </div>

            <div class="form-group col-md-6">
              <label>Card No </label>
              <input
                type="text"
                className="form-control"
                value={this.state.cardno}
                onChange={this.onChangeCardno}
                placeholder="**** **** **** ****"
                required
              />
            </div>

            <div class="form-group col-md-6">
              <label>CVV Number </label>
              <input
                type="number"
                className="form-control"
                value={this.state.cvc}
                onChange={this.onChangePersonCvc}
                placeholder="***"
                required
              />
            </div>

            <div class="form-group col-md-6">
              <label>Expire Date </label>
              <input
                type="text"
                className="form-control"
                value={this.state.expiredate}
                onChange={this.onChangeExpiredate}
                placeholder="MM / YY"
                required
              />
            </div>

            <div class="form-group col-md-6">
              <label>Address : </label>
              <br></br>
              <textarea
                className="form-control"
                value={this.state.address}
                onChange={this.onChangePersonaddress}
              />
            </div>
          </form>

          <div className="form-group">
            <Link to onClick={this.onSubmit} className="btn btn-primary">
              Confirm Order
            </Link> &nbsp;
            <Link to onClick={this.onSubmit2} className="btn btn-primary">
              Save As draft
            </Link>
          </div>
        </div>

        <br></br>
      </div>
    );
  }
}
