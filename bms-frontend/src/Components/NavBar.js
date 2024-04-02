import React, {useEffect, useState} from "react";
import "./Navbar.css";
import {BrowserRouter, Link} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import BMSLogo from "../Public/book-and-glasses-svgrepo-com.svg"
import SearchBox from "./SearchInput";
import ShowBookPopUp from "./ShowBookDetails";
import axios from "axios";

const Navbar = ({toggle, navItemList}) => {
    const [allBooks, setAllBooks] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/ReadAllBooks`);
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
        <BrowserRouter>
            <nav>
                <Link to="/" onClick={() => window.open("/", '_self')} className="link">
                    <img height={80} src={BMSLogo} alt={'Logo'} style={{padding: '0 20px 0 0'}}/>
                    Book Management System
                </Link>
                <div className="menu-items">
                    {navItemList.map((item, index) => (
                        <Link className="link" to={item.link} onClick={() => window.open(item.link, '_self')} key={index}>
                            {item.title}
                        </Link>
                    ))}
                    <SearchBox words={allBooks} onSelect={handleSelect}/>
                </div>
                <div className="icons">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="github-icon icon-tabler icon-tabler-brand-github"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="#228b22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                    </svg>
                    <div className="mobile-menu-icon">
                        <FaBars onClick={() => toggle(true)}/>
                    </div>
                </div>
            </nav>
            <ShowBookPopUp open={showDetails}
                           handleClose={() => setShowDetails(false)}
                           title={selection}/>
        </BrowserRouter>
    );
};

export default Navbar;
