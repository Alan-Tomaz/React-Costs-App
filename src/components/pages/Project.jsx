import { useEffect, useState } from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false);
    const { id } = useParams();

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

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {project.name ? (<div className={styles.project_details}>
                <Container customClass="column">
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
                                <p>Details Of The Project</p>
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