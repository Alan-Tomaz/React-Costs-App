import styles from './Projects.module.css';
import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import { useEffect, useState } from 'react';

function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch(err => console.log(err))
        }, 3000);
    }, [])

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Create Project" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map(project =>
                    (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                        />
                    )
                    )
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 &&
                    (
                        <p>There are no registered projects</p>
                    )
                }
            </Container>
        </div>
    )
}

export default Projects;