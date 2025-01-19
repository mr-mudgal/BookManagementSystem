const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URL;

const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

mongoose.connect(uri, clientOptions).then(() => {
    console.log("Connected to DataBase successfully!");
}).catch((err) => {
    console.log("! ERROR connecting DataBase!\n" + err)
})
