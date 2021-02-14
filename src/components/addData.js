import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import "./addData.css"

class AddData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isName: true,
            country: "",
            isCountry: true,
            mobile: "",
            isMobile: true,
            email: "",
            isEmail: true,
            pic: "",
            src: "",
        }
    }
    componentDidMount() {
        if (this.props && this.props.AValue) {
            let { name,
                country,
                mobile,
                email,
                src } = this.props.AValue
            this.setState({
                name,
                country,
                mobile,
                email,
                src
            })
        }
    }
    formchange = (data) => {
        this.setState({ 
            [data.target.name]: data.target.value, 
            isMobile: true, isEmail: true, isName: true, isCountry: true 
        });

    }
    handlePictureSelected = (e) => {
        let pic = e.target.files[0];
        let type = pic.type.split("/")
        if (type.length > 1 && (type[1] === "jpeg" || type[1] === "jpg")) {
            let src = URL.createObjectURL(pic);
            this.setState({ pic, src });
        } else {
            alert("Only jpeg and jpg expecting");
        }

    }
    formSubmit = () => {
        let regex = /^[a-zA-Z ]{2,30}$/;
        if (!regex.test(this.state.name)) {
            this.setState({ isName: false })
            return true;
        }
        if (!regex.test(this.state.country)) {
            this.setState({ isCountry: false })
            return true;
        }
        let pattern = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (!pattern.test(this.state.mobile)) {
            this.setState({ isMobile: false })
            return true;
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!mailformat.test(this.state.email)) {
            this.setState({ isEmail: false })
            return true;
        }
        if (this.state.isMobile && this.state.isEmail && this.state.src) {
            this.setState({ isData: false })
            let localValue = {
                name: this.state.name,
                country: this.state.country,
                mobile: this.state.mobile,
                email: this.state.email,
                image: this.state.src
            }
            //console.log(localValue," ghfghf ")
            let url = "http://localhost/muvi_task/api/addUser";
            if (this.props.isEdit) {
                localValue.id=this.props.AValue.id;
                url= "http://localhost/muvi_task/api/edituser";
            }
                //this.props.addUser(localValue)
                fetch(url, {
                method: 'POST',
                body: JSON.stringify(localValue),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response => {
                        if(response.status === 200) {
                            if(this.props.isEdit) 
                                alert("User data updated");
                            else
                                alert("User data Added");
                            this.props.history.push("/Datalist")
                        }
                    })
                    .catch(error => {
                       alert("somthing went wrong");
                       
                    });
            

        } else {
            alert("somthing went wrong please check all the fields!!");
        }
    }
    render() {
        let { name,
            country,
            mobile,
            email,
            src } = this.state;
        return (
            <div className="parent-wrapper">
                <h2>Add User </h2>
                <div className="form-wrapper">
                    <div className="input-wrapper">
                        <input type="text" name="name" placeholder="Name" value={name} onChange={this.formchange} />
                        {this.state.isName ? '' : <p className="error-message">
                            Enter Valid Name
                    </p>}
                    </div>
                    <div className="input-wrapper">
                        <input type="text" name="country" placeholder="Country" value={country} onChange={this.formchange} />
                        {this.state.isCountry ? '' : <p className="error-message">
                            Enter Country Name
                    </p>}
                    </div>
                    <div className="input-wrapper">
                        <input type="text" name="mobile" placeholder="Mobile Number" value={mobile} onChange={this.formchange} />
                        {this.state.isMobile ? '' : <p className="error-message">
                            Mobile number should be 10 digits
                    </p>}
                    </div>
                    <div className="input-wrapper">
                        <input type="text" name="email" placeholder="Email " value={email} onChange={this.formchange} />
                        {this.state.isEmail ? '' : <p className="error-message">
                            Please enter valid emailId
                    </p>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={this.handlePictureSelected}
                        />
                    </div>
                    <div className="input-wrapper">
                        <button type="submit" onClick={this.formSubmit} className="btn btn-primary" name="sub-btn" >{this.props.isEdit ? "Update" : "Submit"}</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        AValue: state.editData,
        isEdit: state.isEdit
    };
};
export default connect(mapStateToProps, { })(withRouter(AddData))
