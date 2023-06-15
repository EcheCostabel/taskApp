import Task from "../models/task.model.js"


export const getTasks = async (req, res) => {

    try {
        const tasks = await Task.find({
            user: req.user.id  //Con esto le digo que me traiga solo las tareas del user que esta logeado
        }).populate('user');
        res.json(tasks)
    } catch (error) {
        return res.status(404).json({message: 'Task not found'})
    }
}


export const createTask = async (req, res) => {
    try {
        const {title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })
        const savedTask = await newTask.save();
        res.json(savedTask)
    } catch (error) {
        return res.status(404).json({message: 'Error'})
        
    }

 
}


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if(!task) return res.status(404).send({message: 'Task not found'})
        res.json(task)
    } catch (error) {
        return res.status(404).json({message: 'Error'})
    }
}


export const deleteTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).send({message: 'Task not found'})
    
        res.sendStatus(204)
        
    } catch (error) {
        return res.status(404).json({message: 'Error'})
    }
}


export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});  //Para actualizar le mando como 2do parametro lo que quiero que mande y con el 3er le digo que me mande el dato nuevo, sino me manda el viejo
        if(!task) return res.status(404).send({message: 'Task not found'})
    
        res.json(task)
    } catch (error) {
        return res.status(404).json({message: 'Error'})
    }

}