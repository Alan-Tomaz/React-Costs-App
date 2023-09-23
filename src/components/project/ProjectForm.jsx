import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitBtn from '../form/SubmitBtn';

function ProjectForm({ btnText }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": 'application.json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <form className={styles.form}>
            <Input type="text" text="Project Name" name="name" placeholder="Insert Your Project Name" />
            <Input type="number" text="Project Budget" name="budget" placeholder="Insert Your Total Budget" />
            <Select name="category_id" text="Select Your Category" options={categories} />
            <SubmitBtn text={btnText} />
        </form>
    )
}

export default ProjectForm;
