const express = require('express');
const axios = require('axios');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { pushFile } = require('./file.js');
const { connection } = require('./database.js');

/* https://github.com/RedPi/server-node.git */

const server = express();
const port = 8080;

server.use(bodyParser.json());
server.use(cors());

router.get('/files', (req, res) => {
    const { filename, numFiles } = req.query; 
    pushFile(filename, parseInt(numFiles, 0))
    .then(messages => res.status(201).json({ message : messages}))
    .catch((err) => res.status(201).json({ message : err }));
});

router.get('/users/:id', (req, res) => {
    const { id } = req.params; 
    connection.connect();
    connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if (error) res.status(201).json({ error });
        res.status(201).json({ user : results[0]});
    });      
});


router.post('/postRoute', (req, res) => {
    const { url } = req.body; 
    axios.get(url)
    .then(response => res.status(201).json({ contenu : response.data}))
    .catch((err) => res.status(201).json({ err }));
});


server.use(router);
server.listen(port, () => {
    console.log(`Node Server is running on port ${port} 🚀`);
});
