import React, { Component } from "react";
import axios from "axios";

export default class SiteManager extends Component {
  constructor() {
    super();

    this.state = {};

    this.routeChange = this.routeChange.bind(this);
    this.routeChange1 = this.routeChange1.bind(this);
  }

  routeChange(e) {
    this.props.history.push("/admin/createUser");
  }

  routeChange1(e) {
    this.props.history.push("/admin_/createCourse");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }} className="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                {/* <a href="#" class="btn btn-primary">
                  Go somewhere
                </a> */}
                <button type="button" class="btn btn-link"
                    onClick={this.routeChange1}></button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
