import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class EmployeeTableRow extends Component {


  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}

delete() {
    axios.get('http://localhost:4000/employee/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
}


    render() {
      return (
          <tr>
            <td>
              {this.props.obj.employeeId}
            </td>
            <td>
              {this.props.obj.employeeName}
            </td>
            <td>
              {this.props.obj.empAddress}
            </td>
            <td>
              {this.props.obj.employeeEmail}
            </td>
            <td>
              {this.props.obj.employeemobile}
            </td>
            <td>
              {this.props.obj.employeedescription}
            </td>
            <td>
            <Link to={"/employeeedit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default EmployeeTableRow;