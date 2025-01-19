import './App.css';
import BMSHomePage from "./Components/HomePage";
import DisplayAllBooks from "./Components/DisplayAllBooks";
import CreateBookForm from "./Components/CreateNewBook";
import Error404 from "./Components/Error404";
import React, {useState} from "react";
import MobileMenu from "./Components/MobileNavbar";
import ResponsiveAppBar from "./Components/NavBar";
import {makeStyles} from "@mui/styles";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    palette: {
        text: {
            primary: '#006600'
        }
    }, typography: {
        fontWeightBold: 2
    }, shadows: [1, 2, 3, 4, 5, 6],
    breakpoints: { // Define breakpoints at 700px
        values: {
            xs: 0,
            sm: 600, // Standard screens
            md: 700,  // Your custom breakpoint
            lg: 900,
            xl: 1200,
        },
    }
});
const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url("path/to/your/book-background.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        [theme.breakpoints.down('md')]: {  // Responsive adjustments for smaller screens
            justifyContent: 'center',
        },
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    navigationButton: {
        color: theme.palette.primary,
        marginRight: theme.spacing(2),
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        [theme.breakpoints.down('md')]: {  // Responsive font size adjustment
            fontSize: theme.typography.subtitle1.fontSize,
        },
    },
    contentContainer: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(0),
    },
    sectionCard: {
        marginBottom: theme.spacing(4),
        boxShadow: theme.shadows[2],
    },
    sectionCardContent: {
        textAlign: 'justify',
    },
}));

function App() {
    const classes = useStyles();
    const navItemList = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/read-all-books",
        },
        {
            title: "Create New Book",
            link: "/create-new-book",
        }
    ]
    const [openMobileMenu, setOpenMobileMenu] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer/>
            {openMobileMenu ? <MobileMenu openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu} navItemList={navItemList}/> :
                <ResponsiveAppBar toggle={setOpenMobileMenu} navItemList={navItemList}/>}
            <Router>
                <Routes>
                    <Route path={"/"} exact element={<BMSHomePage classes={classes}/>}/>
                    <Route path={"/read-all-books"} exact element={<DisplayAllBooks/>}/>
                    <Route path={"/create-new-book"} exact element={<CreateBookForm/>}/>
                    <Route path={"/*"} exact element={<Error404/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
