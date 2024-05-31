const router = require('express').Router();
const {createTask, viewAllTasks,previewTask,updateTask,deleteTask} = require('../Controllers/task');



router.post('/createTask', createTask);
router.get('/viewAllTasks', viewAllTasks);
router.get('/previewTask/:id', previewTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;