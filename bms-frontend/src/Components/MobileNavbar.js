import React, {useEffect, useState} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchBox from "./SearchInput";
import axios from "axios";
import ShowBookPopUp from "./ShowBookDetails";

const MobileMenu = ({openMobileMenu, setOpenMobileMenu, navItemList}) => {
    const [allBooks, setAllBooks] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const response = await axios.get(`${'http://192.168.245.1:8080'}/ReadAllBooks`);
                let temp = [];
                response?.data?.data?.map((book) => temp.push(book.Title));
                setAllBooks(temp);
            } catch (e) {
                console.log('Error fetching all books for search!')
            }
        }
        getAllBooks()
    }, []);

    const handleSelect = (selectedWord) => {
        setShowDetails(true);
        setSelection(selectedWord);
    };

    return (
        <div>
            <IconButton color="inherit" aria-label="open menu" edge="end" onClick={() => setOpenMobileMenu(false)}>
                <MenuIcon/>
            </IconButton>
            <AppBar position="fixed" color="transparent" open={openMobileMenu} sx={{top: 0, left: 0, width: '100%', height: '100vh', backdropFilter: "blur(10px)"}}>
                <Toolbar sx={{justifyContent: 'center'}}>
                    <Typography variant="h6" noWrap component="div" sx={{color: 'black'}} onClick={() => setOpenMobileMenu(false)}>
                        Close
                    </Typography>
                    <IconButton color="inherit" aria-label="close menu" edge="end" onClick={() => setOpenMobileMenu(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)'}}> {/* Center buttons vertically */}
                    {navItemList?.map((button) => (
                        <Button key={button.title} variant="contained" sx={{margin: 2, backgroundColor: "#228b22"}} onClick={() => window.open(button.link, '_self')}>
                            {button.title}
                        </Button>
                    ))}
                    <SearchBox words={allBooks} onSelect={handleSelect}/>
                    <ShowBookPopUp open={showDetails}
                                   handleClose={() => setShowDetails(false)}
                                   title={selection}/>
                </div>
            </AppBar>
        </div>
    );
};

export default MobileMenu;
