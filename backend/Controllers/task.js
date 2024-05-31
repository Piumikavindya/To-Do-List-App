const Task = require('../Models/task');

exports.createTask = async (req, res) => {
    const { taskName, description } = req.body;

    try {
        const newTask = new Task({ taskName, description });
        const savedTask = await newTask.save();
        return res.status(201).json({ task: savedTask });
    } catch (error) {
        console.error("Error saving Task:", error);
        return res.status(500).json({ error: "Error saving Task" });
    }
};

exports.viewAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching tasks" });
    }
};

exports.previewTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ status: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with getting task", error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    let taskId = req.params.id;
    const { taskName, description } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { taskName, description }, { new: true });
        res.status(200).json({ status: "Task updated", task: updatedTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating task", error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    let taskId = req.params.id;
    try {
        await Task.findByIdAndDelete(taskId);
        res.status(200).send({ status: "Task deleted" });
    } catch (err) {
        res.status(500).send({ status: "Error with delete task", error: err.message });
    }
};
