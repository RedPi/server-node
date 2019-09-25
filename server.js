const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const cors = require('cors');
const { pushFile } = require('./file.js');

const server = express();
const port = 8080;

// // app.use(bodyParser.json());
// // app.use(cors());

router.get('/files', (req, res) => {
    const { filename, numFiles } = req.query; 
    pushFile(filename, parseInt(numFiles, 0))
    .then(messages => res.status(201).json({ message : messages}))
    .catch((err) => res.status(201).json({ message : err }));
});

server.use(router);
server.listen(port, () => {
    console.log(`Node Server is running on port ${port} 🚀`);
});
