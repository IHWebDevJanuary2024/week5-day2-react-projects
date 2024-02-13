// src/pages/ProjectListPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";


function ProjectListPage() {
    const [projects, setProjects] = useState([]);


    const getAllProjects = () => {
        axios
            .get(`${API_URL}/projects?_embed=tasks`)
            .then((response) => setProjects(response.data))
            .catch((error) => console.log(error));

        /*  
        fetch(`${API_URL}/projects?_embed=tasks`)
        .then((response) => response.json()) // axios doesn't need this extra step
        .then((jsonResponse) => setProjects(jsonResponse))
        .catch((error) => console.log(error)); 
        */
    };

    const handleDelete = (projectId) => {
        axios
            .delete(`${API_URL}/projects/${projectId}`)
            .then((response) => {
                console.log(response)
                getAllProjects()
            })
            .catch((error) => console.log(error));
    }

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllProjects();
    }, []);


    return (
        <div className="ProjectListPage">
            <Link to="/projects/create">          {/*  <== ADD   */}
                <button>Create Project</button>
            </Link>

            {projects.map((project) => {
                return (
                    <ProjectCard handleDelete={handleDelete} project={project} key={project.id} />
                );
            })}

        </div>
    );
}

export default ProjectListPage;
