// src/pages/EditProjectPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function EditProjectPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { projectId } = useParams();
    const navigate = useNavigate();

    const getProject = () => {
        axios
            .get(`${API_URL}/projects/${projectId}`)
            .then((response) => {
                setTitle(response.data.title)
                setDescription(response.data.description)
            })
            .catch((error) => console.error(error))
    }

    const updateProject = (e) => {
        e.preventDefault()
        const updatedProject = { title, description }
        console.log(updatedProject);
        axios
            .put(`${API_URL}/projects/${projectId}`, updatedProject)
            .then((response) => {
                console.log(response)
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={updateProject}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default EditProjectPage;
