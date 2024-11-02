require('dotenv').config();

const express = require('express');
const ErrorHandler = require('./controllers/ErrorController');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


const http = require('http');
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use('/files', express.static('./files'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use('/api/auth', authRoutes);

app.use(ErrorHandler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});