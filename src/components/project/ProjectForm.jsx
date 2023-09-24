import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitBtn from '../form/SubmitBtn';

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-type": 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type="text" text="Project Name" name="name" placeholder="Insert Your Project Name" handleOnChange={handleChange} value={project.name ? project.name : ""} />
            <Input type="number" text="Project Budget" name="budget" placeholder="Insert Your Total Budget" handleOnChange={handleChange} value={project.budget ? project.budget : ""} />
            <Select name="category_id" text="Select Your Category" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ""} />
            <SubmitBtn text={btnText} />
        </form>
    )
}

export default ProjectForm;
