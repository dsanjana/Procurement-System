import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SupplierTableRow extends Component {


  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}

delete() {
    axios.get('http://localhost:4000/supplier/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
}


    render() {
      return (
          <tr>
            <td>
              {this.props.obj.supplierId}
            </td>
            <td>
              {this.props.obj.supplierName}
            </td>
            <td>
              {this.props.obj.sAddress}
            </td>
            <td>
              {this.props.obj.supplierEmail}
            </td>
            <td>
              {this.props.obj.suppliermobile}
            </td>
            <td>
              {this.props.obj.supplierdescription}
            </td>
            <td>
            <Link to={"/supplieredit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default SupplierTableRow;