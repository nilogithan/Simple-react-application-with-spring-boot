import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Listproject from "./ListProjects";
import AddProject from "./AddProject";
import EditProject from "./EditProject";

class ProjectIndex extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route  path="/" exact component = {Listproject} />
                    <Route  path="/AddProject" exact component ={AddProject}/>
                    <Route  path="/EditProject/:id" exact component ={EditProject}/>
                </Switch>
            </Router>
        );
    }
}
export default ProjectIndex;