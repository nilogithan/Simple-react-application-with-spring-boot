import React from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Table.css";
import "./button.css";

class ListProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = { projects: [], name: null, query: "" };
        this.deleteProject = this.deleteProject.bind(this);
        this.refreshProject = this.refreshProject.bind(this);
        this.routeAddProject = this.routeAddProject.bind(this);
    }

    refreshProject() {
        axios.get("http://localhost:8080/test/project/api/v1/project").then(Response => {
            this.setState = ({ projects: Response.data.content });
            console.warn("Refresh Service is working");
        });
    }

    componentDidMount() {
        axios.get("http://localhost:8080/test/project/api/v1/project").then(Response => {
            this.setState({ projects: Response.data.content });
            console.log(Response.data);
            console.warn("project service is working");
        });
        this.refreshProject();
    }

    routeAddProject() {
        let path = `/AddProject`;
        this.props.history.push(path);
    }



    routeEditProject(id) {
        this.props.history.push(`/EditProject/${id}`);
    }

    deleteProject(id) {
        axios.delete("http://localhost:8080/test/project/api/v1/project/" + id).then(response => {
            this.refreshProject(response);
            alert("Project Deleted Success");
            console.warn("Delete Service is working");
        });

    }


    render() {
        return (
            <div >
                <h3 align="center">LIST-BOOKS</h3>
                <div class="container-table100">
                    
                    <div class="wrap-table100">
                        {/* <div class="table100"> */}
                        <h1 align="center">LIST-PROJECTS</h1>
                    <br/>
                    <br/>
                        <button className="addButton"
                            variant="success"  type="submit"  onClick={this.routeAddProject} >
                            <i className="fa fa-plus"> Add project</i>
                         </button>
                        <br/>
                        <br/>
                        <table className="table"  align="center">
                        <thead>
                            <tr class="table100-head">
                                <th>PROJECT-ID</th>
                                <th>PROJECT-NAME</th>
                                <th>PROJECT-DESCRIPTION</th>
                                <th> &nbsp; &nbsp; &nbsp; &nbsp;ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.projects.map(project => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>
                                    &nbsp;
                                    <button
                                            className="viewButton"
                                            onClick={() =>
                                                window.confirm(
                                                    "Are you sure you wish to delete this Book? "
                                                ) && this.deleteProject(project.id)
                                            }
                                        >
                                            <i className="fa fa-eye"> View</i>
                                        </button>
                                    &nbsp;
                                        <button className="editButton" type="submit">
                                            <i
                                                className="fa fa-edit"
                                                onClick={() => this.routeEditProject(project.id)}
                                            >
                                                Edit
                                        </i>
                                        </button>
                                        &nbsp;
                                        <button
                                            className="deleteButton"
                                            onClick={() =>
                                                window.confirm(
                                                    "Are you sure you wish to delete this Book? "
                                                ) && this.deleteProject(project.id)
                                            }
                                        >
                                            <i className="fa fa-trash"> Delete</i>
                                        </button>
                                        &nbsp;
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
                        </div>
                     </div>
                 </div>
                //  </div>
            
        );
    }
}
export default ListProjects;