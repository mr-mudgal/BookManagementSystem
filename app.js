const http = require("http");
const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const server = http.createServer(app);
const db = require('./DBconnection.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
})
app.use("/", require("./Routes/Crud routes"));


server.listen((8080), () => {
    console.log(`Server is running at port: ${8080} !`)
});
