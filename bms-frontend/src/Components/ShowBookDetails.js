import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";

const ShowBookDetails = ({open, handleClose, title}) => {
    const [bookData, setBookData] = useState(null);

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

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Book Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Details of the {bookData?.Title}.
                    </DialogContentText>
                    <Typography sx={{fontWeight: 1000, display: "inline", fontSize: 20}}>Title: &ensp;</Typography>
                    <Typography sx={{display: "inline", fontSize: 20}}>{bookData?.Title}</Typography>
                    <br/>
                    <Typography sx={{fontWeight: 1000, display: "inline", fontSize: 20}}>Author: &ensp;</Typography>
                    <Typography sx={{display: "inline", fontSize: 20}}>{bookData?.Author}</Typography>
                    <br/>
                    <Typography sx={{fontWeight: 1000, display: "inline", fontSize: 20}}>Year: &ensp;</Typography>
                    <Typography sx={{display: "inline", fontSize: 20}}>{bookData?.Year}</Typography>
                    <br/>
                    <Typography sx={{fontWeight: 1000, display: "inline", fontSize: 20}}>Content: &ensp;</Typography>
                    <Typography sx={{display: "inline", fontSize: 20}}>{bookData?.Content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" sx={{borderRadius: "15px"}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ShowBookDetails;
