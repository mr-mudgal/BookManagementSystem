import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ConfirmationDialog from "./DeletePopUp";
import axios from "axios";
import {toast} from "react-toastify";

const EditPopUp = ({open, handleClose, title, setTitle}) => {
    const [bookData, setBookData] = useState(null);
    const [confirmEdit, setConfirmEdit] = useState(false)

    useEffect(() => {
        const getThisBook = async () => {
            try {
                const temp = await axios.get(`${'http://192.168.245.1:8080'}/ReadBook-${title}`);
                setBookData(temp?.data?.data);
            } catch (e) {
                toast.error("Failed to Read Book!", {position: "top-center", autoClose: 1125});
            }
        }
        if (open) getThisBook()
    }, [open, title])

    const EditBook = async () => {
        try {
            let temp = JSON.stringify({Title: bookData?.Title, Author: bookData?.Author, Year: bookData?.Year, Content: bookData?.Content})
            await axios.patch(`${'http://192.168.245.1:8080'}/UpdateBook-${title}`, temp);
            toast.success(`${title} Edited Successfully!`, {position: "top-center", autoClose: 1125});
            setTitle(null);
            setConfirmEdit(false);
            handleClose();
        } catch (e) {
            toast.error("Failed to Edit Book!", {position: "top-center", autoClose: 1125});
        }
    }

    const handleChange = (event) => {
        setBookData({...bookData, [event.target.name]: event.target.value});
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the details of the book you want to add.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        name="Title"
                        value={bookData?.Title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="author"
                        label="Author"
                        type="text"
                        fullWidth
                        name="Author"
                        value={bookData?.Author}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="year"
                        label="Year"
                        type="number"
                        fullWidth
                        name="Year"
                        value={bookData?.Year}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="content"
                        label="Content"
                        multiline
                        rows={4}
                        fullWidth
                        name="Content"
                        value={bookData?.Content}
                        onChange={handleChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" sx={{borderRadius: "15px"}}>
                        Cancel
                    </Button>
                    <Button onClick={() => setConfirmEdit(true)} color="primary" sx={{borderRadius: "15px"}}>
                        Submit
                    </Button>
                    <ConfirmationDialog open={confirmEdit}
                                        onClose={() => setConfirmEdit(false)}
                                        title={"Confirmation Edit"}
                                        message={`Do you confirm to Edit the details for: ${title}`}
                                        onConfirm={EditBook}/>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditPopUp;
