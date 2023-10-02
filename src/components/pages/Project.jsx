import { useEffect, useState } from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

function Project() {

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false);
    const { id } = useParams();
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => resp.json())
                .then(data => setProject(data))
                .catch(err => console.log(err))
        }, 3000);

    }, [id])

    function editPost(project) {
        // budget validation
        if (project.budget < project.cost) {
            setMessage("The budget cannot be less than the project cost!");
            setType("error");
            return false;
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false);
                setMessage("Project Updated!");
                setType("success");
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {project.name ? (<div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Project: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit Project" : "Close"}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categories: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total Badget: </span>US${project.budget}
                                </p>
                                <p>
                                    <span>Total Used: </span>US${project.cost}
                                </p>
                            </div>

                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Finish Editing" projectData={project} />
                            </div>
                        )}
                    </div>
                </Container>
            </div>) :
                (<Loading />)
            }
        </>
    )
}

export default Project;