import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import './CreateNewBook.css'
import ConfirmationDialog from "./DeletePopUp";
import {toast} from "react-toastify";
import axios from "axios";

const CreateBookForm = () => {
    const [bookTitle, setBookTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [year, setYear] = useState(null);
    const [content, setContent] = useState(null);
    const [createPop, setCreatePop] = useState(false);
    const [resetPop, setResetPop] = useState(false);

    const handleSubmit = async () => {
        try {
            let data = JSON.stringify({
                Title: bookTitle,
                Author: author,
                Year: year,
                Content: content
            })
            await axios.post(`${'http://192.168.245.1:8080'}/CreateBook`, data)
            setCreatePop(false);
            setBookTitle('');
            setAuthor('');
            setYear('');
            setContent('');
            setCreatePop(false);
            toast.success("Created New Book Successfully!", {position: "top-center", autoClose: 1125});

        } catch (e) {
            toast.error("Failed to Create New Book!", {position: "top-center", autoClose: 1125});
        }
    };

    return (
        <>
            <h1 style={{paddingTop: 100, textAlign: "center", marginTop: 0}}>Fill out the details of the new book</h1>
            <form style={{position: "relative", left: "10%"}} onSubmit={event => {
                event.preventDefault();
                setCreatePop(true);
            }}>
                <TextField
                    label="Book Title"
                    variant="outlined"
                    margin="normal"
                    sx={{width: '80dvw', borderRadius: '50px !important'}}
                    value={bookTitle}
                    onChange={(event) => setBookTitle(event.target.value)}
                    required
                />
                <br/>
                <TextField
                    label="Author"
                    variant="outlined"
                    margin="normal"
                    sx={{width: '80dvw'}}
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    required
                />
                <br/>
                <TextField
                    label="Year"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    sx={{width: '80dvw'}}
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    required
                />
                <br/>
                <TextField
                    label="Content"
                    multiline
                    rows={4}
                    variant="outlined"
                    margin="normal"
                    sx={{width: '80dvw'}}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    required
                />
                <br/>
                <Button type="submit" variant="contained" color="success" sx={{borderRadius: "15px", width: "38dvw", height: "6dvh", fontSize: "20px", marginTop: "2%", padding: "1px"}}>
                    Submit Book
                </Button>
                <ConfirmationDialog open={createPop}
                                    onClose={() => setCreatePop(false)}
                                    onConfirm={handleSubmit}
                                    title={'Confirmation Submit'}
                                    message={'Do you confirm to Submit and create New Book based on the details filled in the form?'}/>
                <Button onClick={() => {
                    setResetPop(true);
                }} variant="contained" sx={{borderRadius: "15px", width: "38dvw", height: "6dvh", fontSize: "20px", marginTop: "2%", background: "#bbbbbb", marginLeft: "4dvw", padding: "1px"}}>
                    Reset Form
                </Button>
                <ConfirmationDialog open={resetPop}
                                    onClose={() => setResetPop(false)}
                                    onConfirm={() => {
                                        setBookTitle('');
                                        setAuthor('');
                                        setYear('');
                                        setContent('');
                                        setResetPop(false);
                                    }}
                                    title={'Confirmation Reset'}
                                    message={'Do you confirm to reset the Create New Book form?'}/>
            </form>
        </>
    );
};

export default CreateBookForm;
