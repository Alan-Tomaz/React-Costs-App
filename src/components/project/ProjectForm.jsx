function ProjectForm() {
    return (
        <form>
            <div>
                <input type="text" name="" id="" placeholder="Insert a project Name" />
            </div>
            <div>
                <input type="number" name="" id="" placeholder="Insert Your Complet Budget" />
            </div>
            <div>
                <select name="category" id="">
                    <option value="" disabled selected>Select Your Category</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Create Project" />
            </div>
        </form>
    )
}

export default ProjectForm;
