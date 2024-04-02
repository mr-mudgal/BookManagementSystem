import axios from "axios";
import {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import ConfirmationDialog from "./DeletePopUp";
import {toast} from "react-toastify";
import EditPopUp from "./EditPopUp";

const apiKey = process.env.API_URL

const DisplayAllBooks = () => {
    const [allBookList, setAllBookList] = useState(null);
    const [deletePop, setDeletePop] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [editPop, setEditPop] = useState(false);
    const columns = [
        {
            field: 'id',
            headerName: 'Serial No.',
            minWidth: 140,
            maxWidth: 140,
            align: 'center'
        },
        {
            field: 'Title',
            headerName: 'Title',
            minWidth: 300,
            maxWidth: 300,
            renderCell: ({row}) => row.Title
        },
        {
            field: 'Author',
            headerName: 'Author',
            minWidth: 250,
            maxWidth: 250,
            align: 'center',
            renderCell: ({row}) => row.Author
        },
        {
            field: 'Year',
            headerName: 'Year',
            minWidth: 125,
            maxWidth: 125,
            align: 'center',
            renderCell: ({row}) => row.Year
        },
        {
            field: 'Content',
            headerName: 'Content',
            minWidth: 400,
            maxWidth: 400,
            align: 'justify',
            renderCell: ({row}) => row.Content
        },
        {
            field: 'Actions',
            headerName: 'Actions',
            minWidth: 250,
            maxWidth: 250,
            align: 'center',
            renderCell: ({row}) => <><Button onClick={() => {
                setSelectedBook(row.Title);
                setDeletePop(true);
            }} sx={{borderRadius: "15px"}} color={'error'} variant={'contained'}>Delete
            </Button>&ensp;
                <Button onClick={() => {
                    setSelectedBook(row.Title);
                    setEditPop(true);
                }} sx={{borderRadius: "15px"}} color={'info'} variant={'contained'}>Edit
                </Button>
            </>
        }
    ];

    useEffect(() => {
        try {
            const getAllBooks = async () => {
                const allBookListTemp = await axios.get(`${API_URL}/ReadAllBooks`);
                const newData = allBookListTemp?.data?.data?.map((item, index) => {
                    return {...item, id: index + 1};
                });
                setAllBookList(newData);
            }
            getAllBooks();
        } catch (e) {
            toast.error("Failed to Load Books!", {position: "top-center", autoClose: 1125});
        }
    }, []);

    const DeleteBook = async () => {
        try {
            await axios.delete(`http://localhost:8080/DeleteBook-${selectedBook}`);
            toast.success(`${selectedBook} Deleted Successfully!`, {position: "top-center", autoClose: 1125});
            setDeletePop(false);
            setSelectedBook(null);
        } catch (e) {
            toast.error("Failed to Delete Book!", {position: "top-center", autoClose: 1125});
        }
    }

    return (
        <>
            <h1 style={{marginTop: 0, paddingTop: '100px'}}>Reading All Books here</h1>
            {allBookList?.length > 0 ? <DataGrid autoHeight rows={allBookList} disableRowSelectionOnClick columns={columns} slots={{
                toolbar: GridToolbar,
            }}/> : <h1>No Books to see</h1>}
            <ConfirmationDialog open={deletePop}
                                onClose={() => setDeletePop(false)}
                                title={`Confirm Deletion`}
                                message={`Do you confirm to delete: ${selectedBook}`}
                                onConfirm={DeleteBook}/>
            <EditPopUp open={editPop}
                       handleClose={() => setEditPop(false)}
                       title={selectedBook}
                       setTitle={setSelectedBook}
            />
        </>
    );
}

export default DisplayAllBooks;
