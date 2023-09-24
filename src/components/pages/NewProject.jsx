import { useNavigate } from 'react-router-dom';

import styles from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';

function NewProject() {

    const navigate = useNavigate();

    function createPost(project) {

        // Initialize costs and services
        project.cost = 0;
        project.services = [];

        console.log(project)

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                //redirect
                navigate("/projects", { state: { message: "Project Created Successfully!" } })
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Create Project</h1>
            <p>Create your project and then add your services</p>
            <ProjectForm btnText="Create Project" handleSubmit={createPost} />
        </div>
    )
}

export default NewProject;