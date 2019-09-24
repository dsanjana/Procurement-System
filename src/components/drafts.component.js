//View Credit card payment Form

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class drafts extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.buy = this.buy.bind(this);

    this.state = {
      drafts: [],
      drafts1: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/business/drafts")
      .then(response => {
        console.log(response.data);

        this.setState({
          drafts: response.data
        });

        this.mapfilter();

        //console.log(unique)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  mapfilter() {
    const unique = this.state.drafts
      .map(e => e["ino"])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => this.state.drafts[e])
      .map(e => this.state.drafts[e]);

    this.setState({
      drafts: unique
    });
  }

  delete(e) {
    const gid = e.target.id;
    axios
      .get("http://localhost:4000/business/draftdelete/" + gid)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));

    axios
      .get("http://localhost:4000/business/drafts")
      .then(response => {
        console.log(response.data);
        this.setState({
          drafts: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  buy(e) {
    var x = e.target.id;
    //alert(x)

    this.props.history.push("/payment1/" + x);
  }

  render() {
    this.state.x = 0;

    return (
      <div className="container">
        <br></br>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>date</th>
              <th>ino</th>

              <th colSpan="2">sum</th>
            </tr>
          </thead>
          <tbody>
            {this.state.drafts.map((obj, index) => {
              return (
                <tr key={obj._id}>
                  <td>{obj.date}</td>
                  <td>{obj.ino}</td>

                  <td>{obj.total}</td>
                  <td>
                    {" "}
                    <Link
                      to
                      onClick={this.delete}
                      id={obj.ino}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </td>

                  <td>
                    {" "}
                    <Link
                      to
                      onClick={this.buy}
                      id={obj.ino}
                      className="btn btn-primary"
                    >
                      Buy
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
