import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    // this.update=this.update.bind(this);
    this.onChangesearch = this.onChangesearch.bind(this);
    this.onsearchsubmit = this.onsearchsubmit.bind(this);
    //this.onbid=this.onbid.bind(this);

    this.state = {
      business: [],
      search: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/business")
      .then(response => {
        this.setState({
          business: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(e) {
    {
      const gid = e.target.id;
      axios
        .get("http://localhost:4000/business/delete/" + gid)
        .then(console.log("Deleted"))
        .catch(err => console.log(err));

      axios
        .get("http://localhost:4000/business")
        .then(response => {
          this.setState({
            business: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  onbid(supplier, pname) {
    // this.props.history.push()

    console.log(supplier);

    // e.preventDefault();

    axios
      .get("http://localhost:4000/supplier/supplier/" + supplier)
      .then(res => {
        const obj = {
          supplier: supplier,
          pname: pname
        };

        // alert(""+res.data.supplierEmail+ "   " +this.state.ebody);

        axios
          .post(
            "http://localhost:4000/supplier/sendbid/" + res.data.supplierEmail,
            obj
          )
          .then(res => {})
          .catch(function(error) {
            console.log(error);
          });
        console.log(res.data);
      });
  }

  onChangesearch(e) {
    console.log(this.state.search);

    this.setState({
      search: e.target.value
    });
  }

  onsearchsubmit(e) {
    axios
      .get("http://localhost:4000/business/search/" + this.state.search)
      .then(response => {
        this.setState({
          business: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3 align="center">Product List</h3>

        <div className="form-group">
          <label>Product Name: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.search}
            onChange={this.onChangesearch}
          />
        </div>

        <td>
          {" "}
          <button onClick={this.onsearchsubmit} className="btn btn-dark">
            Search
          </button>
        </td>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Description</th>
              <th>More Quantities</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.business.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{obj.pid}</td>
                  <td>{obj.pname}</td>
                  <td>{obj.psprice}</td>
                  <td>{obj.supplier}</td>
                  <td>{obj.description}</td>
                  <td>{obj.pqty}</td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={this.delete}
                      id={obj._id}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/edit/" + obj._id} className="btn btn-primary">
                      Edit
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link to={"/view/" + obj._id} className="btn btn-success">
                      View
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link
                      onClick={this.onbid.bind(this, obj.supplier, obj.pname)}
                      id={obj}
                      to
                      className="btn btn-dark"
                    >
                      Bid Request
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
