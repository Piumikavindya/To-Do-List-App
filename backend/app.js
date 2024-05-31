const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const env = require('dotenv');
const app = express();
require('dotenv').config();
require('express-async-errors');
require('./database/database');
const taskRoutes = require('./Routes/task');
const userRoutes = require('./Routes/user');


const PORT = process.env.PORT || 8002;
const path = require('path');
require('dotenv').config();
env.config()

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());





app.use('/user', userRoutes);
app.use('/task', taskRoutes);




app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});
