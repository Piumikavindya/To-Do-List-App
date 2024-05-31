const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({

 taskName: {
    type: String,
    
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('tasks', TasksSchema);
