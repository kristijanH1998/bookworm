import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import { useState, useEffect } from "react";
import BookCard from "./elementaryComponents/bookCard.tsx"

export default function Home() {
    const [searchPlaceholder, setSearchPlaceholder] = useState("title");
    const [jwt, setJwt] = useState<string | null>("");
    const [searchPhrase, setSearchPhrase] = useState<string>("");
    const [bookList, setBookList] = useState<object[]>([]);

    useEffect(() => {
        acquireJwt();
    },[])

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
        setSearchPlaceholder(e.target.value)
    }

    const handlePhraseChange = (event: any) => {
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
        console.log(searchPhrase)
        axios
            .get("http://localhost:3000/search-books", {headers: {"authorization": "Bearer " + jwt}, params: {"search-terms": searchPhrase, criteria: searchPlaceholder}})
            .then((res) => {
                if (res.data.success) {
                    console.log(typeof res.data.data.items)
                    setBookList(res.data.data.items)
                    console.log(bookList)
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });

    };

    return (
        <form id="searchPage" className="d-flex flex-column align-items-center w-75">
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
            
            {bookList.map(book => <BookCard key={book['id']} title={book['volumeInfo']['title']}
            author={book['volumeInfo']['authors']} yearPublished={book['volumeInfo']['publishedDate']}
            thumbnail={book['volumeInfo']['imageLinks']['thumbnail']} description={book['volumeInfo']
            ['description']}></BookCard>)}

        </form>    
    )
}