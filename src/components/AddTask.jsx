// src/components/AddTask.jsx

import { useState } from "react";
import axios from "axios";


const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";


function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { getProject, projectId } = props;



    const handleSubmit = (e) => {
        e.preventDefault()
        const newTask = { title, description, projectId }
        console.log(newTask);
        axios
            .post(`${API_URL}/tasks`, newTask)
            .then((response) => {
                console.log(response)
                setTitle("")
                setDescription("")
                getProject()
            })
            .catch((error) => console.error(error))

    };


    return (
        <div className="AddTask">
            <h3>Add New Task</h3>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
