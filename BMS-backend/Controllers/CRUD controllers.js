const {BooksModel} = require("../Models/Books")


const CreateBookController = async (req, res) => {
    try {
        let data = JSON.parse(Object.keys(req.body)[0])
        await BooksModel.create(data);
        res.status(201).send({result: "Success!", message: "New Book Created Successfully!", data: null});
    } catch (e) {
        res.status(400).send({result: "Error!", message: e.message, data: null});
    }
}


const ReadBookController = async (req, res) => {
    try {
        let book = await BooksModel.findOne({Title: req.params.title});
        res.status(200).send({result: "Success!", message: "Book Retrieved!", data: book});
    } catch (e) {
        res.status(400).send({result: "Error!", message: e.message, data: null});
    }
}


const ReadAllBooksController = async (req, res) => {
    try {
        let allBooksList = await BooksModel.find();
        res.status(200).send({result: "Success!", message: "All Books Retrieved!", data: allBooksList.length > 0 ? allBooksList : null});
    } catch (e) {
        res.status(400).send({result: "Error!", message: e.message, data: null});
    }
}


const UpdateBookController = async (req, res) => {
    try {
        let data = JSON.parse(Object.keys(req.body)[0])
        await BooksModel.updateOne({Title: req.params.title}, data);
        res.status(200).send({result: "Success!", message: "Book Updated Successfully!", data: null});
    } catch (e) {
        res.status(400).send({result: "Error!", message: e.message, data: null});
    }
}


const DeleteBookController = async (req, res) => {
    try {
        await BooksModel.deleteOne({Title: req.params.title});
        res.status(200).send({result: "Success!", message: "Book Deleted Successfully!", data: null});
    } catch (e) {
        res.status(400).send({result: "Error!", message: e.message, data: null});
    }
}


const HomePage = async (req, res) => {
    res.status(200).send("This is the home page!");
}


module.exports = {CreateBookController, ReadBookController, ReadAllBooksController, UpdateBookController, DeleteBookController, HomePage}
