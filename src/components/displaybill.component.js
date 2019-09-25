//View Credit card payment Form

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      x: 0,
      dno: ""
    };
  }

  componentDidMount() {
    this.setState({
      dno: this.props.match.params.id5
    });

    if (this.props.match.params.id5 > 5) {
      axios
        .get(
          "http://localhost:4000/business/drafts/" + this.props.match.params.id5,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }
        )

        .then(response => {
          console.log(response.data);
          axios
            .get(
              "http://localhost:4000/business/draftdelete/" +
                this.props.match.params.id5,{headers: {
                  "Authorization" : "Bearer "+sessionStorage.getItem("token")
                }
              }
            )
            .then(console.log("Deleted"))
            .catch(err => console.log(err));
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

          axios.get("http://localhost:4000/business/deleteitems",{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        }).then(res => {
            console.log(res.data);
          });
          this.setState({
            items: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    this.state.x = 0;

    return (
      <div className="container">
        <br></br>
        <h3 align="center">Bill Information</h3>
        <br />

        <h5 align="center">Name :{this.props.match.params.name}</h5>

        <h5 align="center">Address :{this.props.match.params.address}</h5>
        <br />

        {this.state.items.map(obj => {
          //let y=parseFloat(this.state.x);
          //let z=obj.psprice;
          this.state.x = this.state.x + parseFloat(obj.psprice) * obj.pqty;

          return (
            <div align="center">
              <p>Product: &nbsp; {obj.pname}</p>
              <p>ID: &nbsp; {obj.pid}</p>
              <p> Quantity: &nbsp; {obj.pqty}</p>
              <p> Price: &nbsp; {obj.psprice}</p>
              <p> Supplier: &nbsp; {obj.supplier}</p>
              <br />
            </div>
          );
        })}
        <h4> Sum : &nbsp; {this.state.x}</h4>
        <br />
      </div>
    );
  }
}
