import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import { editActive } from './../action/userAction';

class Datalist extends Component {
    constructor(props){
        super(props);
        this.state = {
           pageIndex:5,
           userlist:[]
        }
    }
    componentDidMount(){
        let data={
            isEdit:false
        }
        this.props.editActive(data);
               
        fetch("http://localhost/muvi_task/api/userlist")
        .then(response => {
            return response.json();
        }).then(result => {
            //console.log(result, " hello ");
            this.setState({userlist:result.data})
        
        });
        // .then(res =>{console.log(" xyz ", res)})
        // .catch(error =>{console.log(" xasd ", error)})
    }
    edituser=(data)=>{
        data.isEdit=true;
        this.props.editActive(data);
        this.props.history.push("/");
    }
    
    render(){
        let data = this.props.userData;
        return(
            <div className="main-wrapper" style={{paddingBottom:"20px"}}>
                <div className="list-wrapper">
                <h2>Userlist Page</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Country Name</th>
                        <th>Email Id</th>
                        <th>Profile</th>
                              
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.userlist.map((value, index) => {
                            if(this.state.pageIndex>index)
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td title="Edit" onClick={()=>this.edituser(value)} style={{color:"blue", cursor:"pointer"}}>{value.name} </td>
                                    <td>{value.country}</td>
                                    <td>{value.email}</td>
                                    <td>
                                    <img src={value.image.replace("http://localhost/muvi_task/","")} style={{height:"150px"}}/>
                                    </td>
                                </tr>
                                
                            )
                        })
                           
                    }
                    </tbody>
                    </table>
                     {this.state.userlist.length>this.state.pageIndex?<button onClick={()=>this.setState({pageIndex:this.state.pageIndex + 5})}>load more</button>:""}
                </div>
            </div>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         userData: state.userData
//     };
// };
export default connect(null, {editActive})(withRouter(Datalist))
