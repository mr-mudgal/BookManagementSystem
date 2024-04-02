const mongoose = require('mongoose');
const uri = "mongodb+srv://BMSuser:BMSuser%401@bmscluster1.qgosfiq.mongodb.net/BooksDB?retryWrites=true&w=majority&appName=bmsCluster1";

const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

mongoose.connect(uri, clientOptions).then(() => {
    console.log("Connected to DataBase successfully!");
}).catch((err) => {
    console.log("! ERROR connecting DataBase!\n" + err)
})
