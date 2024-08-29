import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import { useState, useEffect } from "react";
import BookCard from "./elementaryComponents/bookCard.tsx"
// import google from "@googleapis/books"
// var books = require("@googleapis/books")
// import books from "@googleapis/books"
declare var google: any;
export default function Home() {
    const [searchPlaceholder, setSearchPlaceholder] = useState("title");
    const [jwt, setJwt] = useState<string | null>("");
    const [searchPhrase, setSearchPhrase] = useState<string>("");
    const [bookList, setBookList] = useState<object[]>([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        acquireJwt();
        const script = document.createElement('script');
        script.src = "https://www.google.com/books/jsapi.js";        
        script.type = "text/javascript";
        script.addEventListener('load', () => setScriptLoaded(true));
        document.body.appendChild(script);
        
        // console.log(Object.getOwnPropertyNames(google.books))
        
        
    },[])

    useEffect(() => {
        if(!scriptLoaded) return;
        google.books.load();
        // initialize('ISBN:0738531367');
    }, [scriptLoaded]);

    function alertNotFound() {
        alert("could not embed the book!");
    }

    //makes viewer canvas load contents of a book whose identifier number was received as parameter 'identifier'
    function initialize(identifier: any) {
        var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
        viewer.load(identifier, alertNotFound);
        document.getElementById("viewerCanvas")?.classList.remove("d-none")
        document.getElementById("viewerCanvas")?.classList.add("d-block")
    }

    function favorite(){

    }

    function acquireJwt () {
        if(localStorage.getItem("jwt")) {
            let temp = localStorage.getItem("jwt")
            setJwt(temp);
            // console.log(jwt)
        } else {
            console.log("You are not signed in.");
            return;
        }
    }

    const onRadioChange = (e: any) => {
        // e.preventDefault();
        setSearchPlaceholder(e.target.value)
    }

    const handlePhraseChange = (event: any) => {
        event.preventDefault(); 
        setSearchPhrase(event.target.value);
    }

    const navigate = useNavigate();
    const handleClick = (event: any) => {
        event.preventDefault();
        acquireJwt();
        // console.log(jwt)
        axios
            .get("http://localhost:3000/log-out", {headers: {"authorization": "Bearer " + jwt}})
            .then((res) => {
                if (res.data.success) {
                    localStorage.removeItem("jwt");
                    navigate("/");
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
    };

    const handleSearch = (event: any) => {
        event.preventDefault();
        acquireJwt();
        // console.log(searchPhrase)
        axios
            .get("http://localhost:3000/search-books", {headers: {"authorization": "Bearer " + jwt}, params: {"search-terms": searchPhrase, criteria: searchPlaceholder}})
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.data.items)
                    // console.log(typeof res.data.data.items)
                    setBookList(res.data.data.items)
                    console.log(bookList)
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
        // initialize();
    };

    return (
        <div className="d-flex justify-content-around align-items-center w-100">
            <form id="searchPage" className="d-flex flex-column align-items-center w-50">
                <h1>Search Books</h1>
                <div className="d-flex flex-row m-3">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="title" 
                        checked={searchPlaceholder === "title"} onChange={onRadioChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">Title</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="author"
                        checked={searchPlaceholder === "author"} onChange={onRadioChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Author</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="isbn"
                        checked={searchPlaceholder === "isbn"} onChange={onRadioChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio3">ISBN</label>
                    </div>
                </div>
                
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={searchPhrase}
                        onChange={event => handlePhraseChange(event)} placeholder={"Enter book " + searchPlaceholder} aria-label="Enter book parameters" aria-describedby="button-addon2"/>
                    <button className="btn" type="button" onClick={handleSearch} id="searchBtn">Search</button>
                </div>

                <Link type="button" onClick={handleClick} className="btn" to={''}>Sign Out</Link>
                
                {typeof bookList == 'undefined' ? <h5>No results</h5> : bookList.map(book => <BookCard 
                    key={book['id'] ? book['id'] : undefined} 
                    title={book['volumeInfo']['title'] ? book['volumeInfo']['title'] : "N/A"}
                    author={book['volumeInfo']['authors'] ? book['volumeInfo']['authors'].join(', ') : "N/A"}
                    publisher={book['volumeInfo']['publisher'] ? book['volumeInfo']['publisher'] : "N/A"} 
                    yearPublished={book['volumeInfo']['publishedDate'] ? book['volumeInfo']['publishedDate'] : "N/A"}
                    thumbnail={book['volumeInfo']['imageLinks']['thumbnail']} 
                    description={book['volumeInfo']['description'] ? book['volumeInfo']['description'] : "N/A"} 
                    industryID={book['volumeInfo']['industryIdentifiers'] ? book['volumeInfo']['industryIdentifiers'][0]['identifier'] : "N/A"}
                    categories={book['volumeInfo']['categories'] ? book['volumeInfo']['categories'] : "N/A"}
                    language={book['volumeInfo']['language'] ? book['volumeInfo']['language'] : "N/A"}
                    pageCount={book['volumeInfo']['pageCount'] ? book['volumeInfo']['pageCount'] : "N/A"}
                    onClickRead={() => initialize(book['volumeInfo']['industryIdentifiers'][0]['identifier'])}
                    onClickFav={favorite}
                    >
                </BookCard>)}

            </form>
            <div id="viewerCanvas" style={{width: "800px", height: "650px"}} className="d-none"></div>   
        </div>
    )
}