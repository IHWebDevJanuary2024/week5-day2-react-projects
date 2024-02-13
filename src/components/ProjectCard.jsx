import { Link } from "react-router-dom";
import { useState } from "react";

function ProjectCard(props) {
    const { project, handleDelete } = props
    const [displayConfirmation, setDisplayConfirmation] = useState(false)

    return (
        <div className="ProjectCard card" key={project.id} >
            <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
            </Link>
            <Link to={`edit/${project.id}`} >
                <button>
                    ✏️
                </button>
            </Link>
            <button onClick={() => setDisplayConfirmation(true)}>
                🚽
            </button>
            {displayConfirmation &&
                <div>
                    <p>
                        Do you want to delete this project?
                    </p>
                    <button onClick={() => handleDelete(project.id)}>YES</button>
                    <button onClick={() => setDisplayConfirmation(false)}>No, I regret</button>
                </div>
            }
        </div>
    )
}

export default ProjectCard;