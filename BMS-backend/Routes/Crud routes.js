const {Router} = require("express");
const router = Router()

const {CreateBookController, ReadBookController, ReadAllBooksController, UpdateBookController, DeleteBookController, HomePage} = require("../Controllers/CRUD controllers")


router.post("/CreateBook", CreateBookController)


router.get("/ReadBook-:title", ReadBookController)


router.get("/ReadAllBooks", ReadAllBooksController)


router.patch("/UpdateBook-:title", UpdateBookController)


router.delete("/DeleteBook-:title", DeleteBookController)


router.get("/", HomePage)


router.options("*", (req, res) => {
    if (/DeleteBook-.*$/.test(req.path) || /UpdateBook-.*$/.test(req.path)) res.send('Can Proceed!')
})


router.all("*", (req, res) => {
    res.status(404).send("no page")
})


module.exports = router
