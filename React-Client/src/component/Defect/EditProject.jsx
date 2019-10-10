import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import "./form.css";
import "./button.css";

class EditProject extends Component{
    constructor(props){
        super(props);
        this.state = {projects:[], name: null};
        this.state.projects = {
            name: "",
            description: ""
        };
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangedescription = this.handleChangedescription.bind(this);
        this.routeListProject = this.routeListProject.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChangename(name) {
        this.setState({
          prjName: name.target.value
        });
    }

    handleChangedescription(description){
        this.setState({
            prjDescription: description.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const update= {
            name: this.state.prjName,
            description: this.state.prjName
        };
        axios
        .put("http://localhost:8080/test/project/api/v1/project/"+this.props.match.params.id, update).then(res =>{
            if(res.status === 200){
                alert("Book update successfully.");
                window.location.reload();
            }
        });
        this.routeListProject();
    }

    routeListProject(){
        let path = `/`;
        this.props.history.push(path);
    }

    render(){
        return(
            <div className="col-sm-12">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          
          <h3 align="center">EDIT-PROJECT</h3>
        </div>
        <br />
          <br />
        <Formik>
          <Form className="container" align="center" onSubmit={this.onSubmit}>
          <div className="alignment" align="center">
            
              <label> Project Name</label>
              <br/>
              <input
                className="form-control"
                type="text"
                name="prjname"
                value={this.state.prjname}
                onChange={this.handleChangename}
                placeholder="Project Name Here"
              />
            
            
            <br/>
             <br/>
              <label> Project Description</label>
              <br/>
              <Field
                className="form-control"
                type="text"
                name="prjdescription"
                value={this.state.prjdescription}
                onChange={this.handleChangedescription}
                placeholder="Project Description Here"
              />
            </div>
            <button
              className="addButton"
              value="Submit"
              type="submit"
              align="center"
            >
              <i className="fa fa-plus"> Update</i>
            </button>
            &nbsp;
            <button
              className="deleteButton"
              type="reset"
              onClick={this.routeListProject}
              align="center"
            >
              <i className="fa fa-location-arrow"> cancel</i>
            </button>
            <br />
            &nbsp; &nbsp; &nbsp;
          </Form>
        </Formik>
      </div>
        );
    }
    
}
export default EditProject;