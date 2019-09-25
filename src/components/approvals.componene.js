import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

export default class aprrovals extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.onorder = this.onorder.bind(this);
    this.addorder = this.addorder.bind(this);
    //this.search= this.search.bind(this);

    this.state = {
      isGoing: true,
      approvals: [],
      search: "",
      aname: [],
      sqty: "",
      items: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/business/bills",{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          approvals: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get("http://localhost:4000/business/deleteitems",{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
  }).then(res => {
      console.log(res.data);
    });
  }

  delete(e) {
    {
      const gid = e.target.id;

      alert(gid);
      axios
        .get("http://localhost:4000/business/deleteitems1/" + gid,{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      })
        .then(console.log("Deleted"))
        .catch(err => console.log(err));

      axios
        .get("http://localhost:4000/business/bills",{headers: {
          "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      })
        .then(response => {
          this.setState({
            approvals: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  onsearchsubmit(e) {
    axios
      .get("http://localhost:4000/business/cartsearch/" + this.state.search,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          business: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onorder() {
    axios
      .get("http://localhost:4000/business/items",{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            items: response.data
          },
          () => {
            if (this.state.items == "") {
              alert("haven't selected items !");
            } else {
              this.props.history.push("/payment");
            }
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addorder(e) {
    let x = e.target.id;
    // alert(e.target.id)

    e.preventDefault();

    axios
      .get("http://localhost:4000/business/bill/" + e.target.id,{headers: {
        "Authorization" : "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response => {
        const obj1 = {
          pid: response.data.pid,
          pname: response.data.pname,
          psprice: response.data.psprice,
          pqty: response.data.pqty,
          pcategory: response.data.pcategory,
          description: response.data.description,
          supplier: response.data.supplier
        };

        //alert(e.target.id)

        axios
          .get("http://localhost:4000/business/deleteitemso/" + x,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
          .then(res => {
            console.log("Deleted");
          });

        axios
          .get("http://localhost:4000/business/bills",{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
          .then(response => {
            this.setState({
              approvals: response.data
            });
          })
          .catch(function(error) {
            console.log(error);
          });

        axios
          .post("http://localhost:4000/business/orderingitems", obj1,{headers: {
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
          }
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h3>Approvals</h3>
        <br></br>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Description</th>
              <th>Quantities</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.approvals.map((obj, index) => {
              return (
                <tr key={obj._id}>
                  <td>{obj.pid}</td>
                  <td>{obj.pname}</td>
                  <td>{obj.psprice}</td>
                  <td>{obj.supplier}</td>
                  <td>{obj.description}</td>

                  <td>{obj.pqty}</td>

                  <td>
                    {" "}
                    <Link
                      to
                      onClick={this.delete}
                      id={obj._id}
                      className="btn btn-danger"
                    >
                      Decline
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to
                      onClick={this.addorder}
                      id={obj._id}
                      className="btn btn-dark"
                    >
                      Approve
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          onClick={this.onorder}
          className="btn btn-success btn-lg btn-block"
        >
          Order
        </button>
      </div>
    );
  }
}
