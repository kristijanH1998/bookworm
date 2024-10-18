import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import { useState, useEffect } from "react";
import BookCard from "./elementaryComponents/bookCard.tsx";
declare var google: any;
export default function Home() {
    const [searchPlaceholder, setSearchPlaceholder] = useState("title");
    const [jwt, setJwt] = useState<string | null>("");
    const [searchPhrase, setSearchPhrase] = useState<string>("");
    const [bookList, setBookList] = useState<object[]>([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        acquireJwt();
        const script = document.createElement('script');
        script.src = "https://www.google.com/books/jsapi.js";        
        script.type = "text/javascript";
        script.addEventListener('load', () => setScriptLoaded(true));
        document.body.appendChild(script);
    },[])

    useEffect(() => {
        if(!scriptLoaded) return;
        google.books.load();
    }, [scriptLoaded]);

    function alertNotFound() {
        alert("could not embed the book!");
    }

    useEffect(() => {
        if(jwt && page >= 0) {
            acquireJwt();
            axios
                .get("http://localhost:3000/search-books", {headers: {"authorization": "Bearer " + jwt}, params: {"search-terms": searchPhrase, criteria: searchPlaceholder, page: page * 10}})
                .then((res) => {
                    if (res.data.success) {
                        setBookList(res.data.data.items)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [page])

    //makes viewer canvas load contents of a book whose identifier number was received as parameter 'identifier'
    function initialize(identifier: any) {
        if(typeof identifier != "undefined") {
            const iden = identifier[0]['identifier'];
            var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load(iden, alertNotFound);
            document.getElementById("viewerCanvas")?.classList.remove("d-none");
            document.getElementById("viewerCanvas")?.classList.add("d-block");
        } else {
            alert("could not embed the book!");
        }
    }

    function acquireJwt () {
        if(localStorage.getItem("jwt")) {
            let temp = localStorage.getItem("jwt")
            setJwt(temp);
        } else {
            console.log("You are not signed in.");
            return;
        }
    }

    const onRadioChange = (e: any) => {
        setSearchPlaceholder(e.target.value)
    }

    const handlePhraseChange = (event: any) => {
        event.preventDefault(); 
        setSearchPhrase(event.target.value);
    }

    const navigate = useNavigate();
    const goToPage = (event: any) => {
        event.preventDefault();
        acquireJwt();
        let page = "";
        switch(event.target.id) {
            case "myBooksBtn":
                page = "my-books";
                navigate("/" + page);
                break;
            case "myProfileBtn":
                page = "my-profile";
                navigate("/" + page);
                break;
            case "signOutBtn":
                page = "/";
                axios
                    .get("http://localhost:3000/log-out", {headers: {"authorization": "Bearer " + jwt}})
                    .then((res) => {
                        if (res.data.success) {
                            localStorage.removeItem("jwt");
                            navigate(page);
                        } 
                    })
                    .catch((error) => {
                        console.log(error.response.data.error)
                    });
                break;
            default:
                alert("Action not valid."); 
        }
    };

    //runs when Search button is clicked; calls Google Books API with headers and parameters specified below
    const handleSearch = (event: any) => {
        event.preventDefault();
        acquireJwt();
        axios
            .get("http://localhost:3000/search-books", {headers: {"authorization": "Bearer " + jwt}, params: {"search-terms": searchPhrase, criteria: searchPlaceholder, page: page * 10}})
            .then((res) => {
                if (res.data.success) {
                    setBookList(res.data.data.items)
                    document.getElementById("pagingBtns")?.classList.remove("d-none");
                    document.getElementById("pagingBtns")?.classList.add("d-block");
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
    };

    //runs when Next and Previous buttons are clicked, to fetch next or previous group of 10 output results (from Google Books API)
    const updatePage = (event: any) => {
        event.preventDefault();
        if(event.target.id == "prevBtn") {
            if(page > 0) {
                setPage(page - 1);
            }
        } else {
            if(bookList.length == 10) {
                setPage(page + 1);
            }
        }
    }

    const addToList = (event: any, title: any, author: any, publisher: any, year: any, identifier: any, thumbnail: any) => {
        event.preventDefault();
        acquireJwt();
        let btn = event.currentTarget.id;
        let table = "";
        if(btn == "favBtn"){
            table = "favorite";
        } else if(btn == "finBtn") {
            table = "finished_reading";
        } else if(btn == "wishBtn") {
            table = "wishlist";
        }
        axios
            .post("http://localhost:3000/add-to-list", {data: {"title": title, "author": author, "publisher": publisher, "year" : year, 
                "identifier": identifier, "thumbnail": thumbnail, "table": table}}, {headers: {"authorization": "Bearer " + jwt}})
            .then((res) => {
                if (res.data.success) {
                    alert("Success!");
                } else {
                    alert("This book is already in " + (table == "favorite" ? "Favorites" : 
                        (table == "finished_reading" ? "Finished Books" : (table == "wishlist" ? "Wishlist" : "N/A"))));
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
    }

    return (
        <div className="d-flex w-75">
            <div className="d-flex flex-column justify-content-around align-items-center w-100">
                <nav className="navbar d-flex w-75">
                    <form className="container-fluid justify-content-center">
                        <Link type="button" onClick={goToPage} className="btn me-3" to={'/my-books'} id="myBooksBtn">My Books</Link>
                        <Link type="button" onClick={goToPage} className="btn me-3" to={'/my-profile'} id="myProfileBtn">My Profile</Link>
                        <Link type="button" onClick={goToPage} className="btn" to={''} id="signOutBtn">Sign Out</Link>
                    </form>
                </nav>
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
                        <button className="btn" type="button" onClick={handleSearch}>Search</button>
                    </div>
                    {typeof bookList == 'undefined' ? <h5>No results</h5> : bookList.map(book => 
                    <BookCard 
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
                        onClickRead={() => initialize(book['volumeInfo']['industryIdentifiers'])}
                        onAddToList={(event: any) => addToList(event,
                            book['volumeInfo']['title'] ? book['volumeInfo']['title'] : "N/A", 
                            book['volumeInfo']['authors'] ? book['volumeInfo']['authors'].join(', ') : "N/A", 
                            book['volumeInfo']['publisher'] ? book['volumeInfo']['publisher'] : "N/A", 
                            book['volumeInfo']['publishedDate'] ? book['volumeInfo']['publishedDate'] : "N/A",
                            book['volumeInfo']['industryIdentifiers'] ? book['volumeInfo']['industryIdentifiers'][0]['identifier'] : "N/A", 
                            book['volumeInfo']['imageLinks']['thumbnail'])}
                        >
                    </BookCard>)}
                    <div id="pagingBtns" className="d-none d-flex w-75 justify-content-center">
                        <button className="btn me-3" type="button" onClick={(event) => updatePage(event)} id="prevBtn">Previous</button>
                        <button className="btn" type="button" onClick={(event) => updatePage(event)} id="nextBtn">Next</button>
                    </div>
                </form>   
            </div>
            <div id="viewerCanvas" style={{width: "800px", height: "800px"}} className="d-none my-5"></div>
        </div>
    )
}