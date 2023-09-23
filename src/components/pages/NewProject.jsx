import styles from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';
import SubmitBtn from '../form/SubmitBtn';

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Create Project</h1>
            <p>Create your project and then add your services</p>
            <ProjectForm btnText="Create Project" />
        </div>
    )
}

export default NewProject;