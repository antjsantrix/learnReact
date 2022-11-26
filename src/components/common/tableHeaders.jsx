import React, { Component } from 'react';

class TableHeaders extends Component {
    raiseSort = path =>{
        let sortColumn = this.props.sortColumn;
        if(sortColumn.path === path){
          sortColumn.order = (sortColumn.order) === 'asc'? 'desc': 'asc';
           
        }else{
          sortColumn = {path: path, order:'asc'};
        }
        this.props.onSort(sortColumn);
      }

      //colums, sortColumn
    render() { 
        const {columns} = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(ele => <th key = {ele.path || ele.key} onClick={()=> this.raiseSort(ele.path)}>{ele.label}</th>)}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeaders;