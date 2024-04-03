const mongo = require("mongoose");

const BooksSchema = new mongo.Schema({
    Author: {type: String, required: true},
    Title: {type: String, required: true, unique: true},
    Year: {type: Number, required: true},
    Content: {type: String, required: true}
})

const BooksModel = mongo.model('book', BooksSchema)

module.exports = {BooksModel}
