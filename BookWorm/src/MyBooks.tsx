import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import React from 'react';
import ListBookCard from "./elementaryComponents/listBookCard.tsx";

export default function MyBooks() {

    const [jwt, setJwt] = useState<string | null>("");
    const [favoriteList, setFavoriteList] = useState<object[]>([]);
    const [finishedList, setFinishedList] = useState<object[]>([]);
    const [wishList, setWishList] = useState<object[]>([]);
    const [bookRemoved, setBookRemoved] = useState<Boolean>(true);

    // Saving the JWT key from local storage into jwt state variable
    function acquireJwt () {
        if(localStorage.getItem("jwt")) {
            let temp = localStorage.getItem("jwt")
            setJwt(temp);
        } else {
            alert("You are not signed in.");
            return;
        }
    }
    
    // As soon as page loads, acquire JWT key from local storage by calling acquireJwt()
    useEffect(() => {
        acquireJwt();
    },[])

    // Whenever a book is removed from one of three book category lists (favorites, wishlist, finished reading), re-fetch list of favorite books and display it 
    useEffect(() => {
        if(jwt) {
            axios
                .get("http://localhost:3000/fav-books", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        setFavoriteList(res.data.data)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [jwt, bookRemoved])

    // Whenever a book is removed from one of three book category lists (favorites, wishlist, finished reading), re-fetch list of finished books and display it 
    useEffect(() => {
        if(jwt) {
            axios
                .get("http://localhost:3000/finished-books", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        setFinishedList(res.data.data)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [jwt, bookRemoved])

    // Whenever a book is removed from one of three book category lists (favorites, wishlist, finished reading), re-fetch list of wishlist books and display it 
    useEffect(() => {
        if(jwt) {
            axios
                .get("http://localhost:3000/wishlist", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        setWishList(res.data.data)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [jwt, bookRemoved])

    // Handles navigating over webpages on BookWorm, and hits /log-out endpoint when user clicks on Sign Out button
    const navigate = useNavigate();
    const goToPage = (event: any) => {
        event.preventDefault();
        acquireJwt();
        let page = "";
        switch(event.target.id) {
            case "searchBooksBtn":
                page = "home";
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

    // Handles removing books from each of three book category lists (favorite, wishlist, finished reading) by activating /delete endpoint and resetting bookRemoved state variable
    const deleteBook = (event: any, category: String, identifier: String) => {
        event.preventDefault();
        let table = "";
        switch(category) {
            case "favorites":
                table = "favorite";
                break;
            case "finished":
                table = "finished_reading";
                break;
            case "wishlist":
                table = "wishlist";
                break;
        }
        axios
            .delete("http://localhost:3000/delete", {headers: {"authorization": "Bearer " + jwt}, params: {"identifier": identifier, "table": table}})
            .then((res) => {
                if (res.data.success) {
                    alert("book deleted");
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
        setBookRemoved(!bookRemoved);
    };

    return (
        <div className="d-flex flex-column align-items-center py-4 w-75">
            <nav className="navbar d-flex w-100">
                <form className="container-fluid justify-content-center">
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/home'} id="searchBooksBtn">Search Books</Link>
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/my-profile'} id="myProfileBtn">My Profile</Link>
                    <Link type="button" onClick={goToPage} className="btn" to={''} id="signOutBtn">Sign Out</Link>
                </form>
            </nav>
            <form className="d-flex flex-column align-items-center w-100 p-3">
                <h1 className="my-3">My Books</h1>
                <div className="container w-100">
                    <div className="row">
                            <div style={{borderColor: "#350888", borderStyle: "solid"}} className="d-flex flex-column align-items-center myCol col">
                                <h3>Favorites</h3>
                                {typeof favoriteList == 'undefined' ? <h5>No favorites</h5> : favoriteList.map(book => 
                                    <ListBookCard 
                                        key={book['book_id'] ? book['book_id'] : undefined} 
                                        title={book['title'] ? book['title'] : "N/A"}
                                        author={book['author'] ? book['author'] : "N/A"}
                                        publisher={book['publisher'] ? book['publisher'] : "N/A"} 
                                        yearPublished={book['year'] ? book['year'] : "N/A"}
                                        thumbnail={book['thumbnail']}  
                                        industryID={book['identifier'] ? book['identifier'] : "N/A"}
                                        onDelete={(event: any) => deleteBook(event, "favorites", book['identifier'])}>    
                                    </ListBookCard>)}
                            </div>
                            <div style={{borderColor: "#350888", borderStyle: "solid"}} className="d-flex flex-column align-items-center myCol col">
                                <h3>Finished Reading</h3>
                                {typeof finishedList == 'undefined' ? <h5>No favorites</h5> : finishedList.map(book => 
                                    <ListBookCard 
                                        key={book['book_id'] ? book['book_id'] : undefined} 
                                        title={book['title'] ? book['title'] : "N/A"}
                                        author={book['author'] ? book['author'] : "N/A"}
                                        publisher={book['publisher'] ? book['publisher'] : "N/A"} 
                                        yearPublished={book['year'] ? book['year'] : "N/A"}
                                        thumbnail={book['thumbnail']}  
                                        industryID={book['identifier'] ? book['identifier'] : "N/A"}
                                        onDelete={(event: any) => deleteBook(event, "finished", book['identifier'])}>
                                    </ListBookCard>)}
                            </div>
                            <div style={{borderColor: "#350888", borderStyle: "solid"}} className="d-flex flex-column align-items-center myCol col">
                                <h3>Plan to Read</h3>
                                {typeof wishList == 'undefined' ? <h5>No favorites</h5> : wishList.map(book => 
                                    <ListBookCard 
                                        key={book['book_id'] ? book['book_id'] : undefined} 
                                        title={book['title'] ? book['title'] : "N/A"}
                                        author={book['author'] ? book['author'] : "N/A"}
                                        publisher={book['publisher'] ? book['publisher'] : "N/A"} 
                                        yearPublished={book['year'] ? book['year'] : "N/A"}
                                        thumbnail={book['thumbnail']}  
                                        industryID={book['identifier'] ? book['identifier'] : "N/A"}
                                        onDelete={(event: any) => deleteBook(event, "wishlist", book['identifier'])}>
                                    </ListBookCard>)}
                            </div>
                    </div>
                </div>
            </form>
        </div>
    )
}