import styles from '../project/ProjectForm.module.css';
import Input from '../form/Input';
import SubmitBtn from '../form/SubmitBtn';
import { useState } from 'react';

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service);
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Service Name" name="name" placeholder="Insert Your Service Name" handleOnChange={handleChange} />
            <Input type="number" text="Service Cost" name="cost" placeholder="Insert The Total Value" handleOnChange={handleChange} />
            <Input type="text" text="Service Description" name="description" placeholder="Descript The Service" handleOnChange={handleChange} />
            <SubmitBtn text={btnText} />
        </form>
    )
}

export default ServiceForm