import { useEffect, useState } from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import { parse, v4 as uuidv4 } from 'uuid';

function Project() {

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
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

        setMessage("");

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

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    function createService(project) {
        //get last service
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        //maximum validation
        if (newCost > parseFloat(project.budget)) {
            setMessage("Budget Exceeded, Check The Price of The Service")
            setType('error');
            project.services.pop();
            return false;
        }

        //add service cost to prject total cost
        project.cost = newCost;

        // updateProject
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(data => {
                // show the services
                console.log(data)
            })
            .catch(err => console.log(err));
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
                    <div className={styles.service_form_container}>
                        <h2>Add a service:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Add Service" : "Close"}</button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm handleSubmit={createService} btnText="Add Service" projectData={project} />
                            )}
                        </div>
                    </div>
                    <h2>Services</h2>
                    <Container customClass="start">
                        <p>Services Items</p>
                    </Container>
                </Container>
            </div>) :
                (<Loading />)
            }
        </>
    )
}

export default Project;