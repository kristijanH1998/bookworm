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
    
    useEffect(() => {
        acquireJwt();
    },[])

    useEffect(() => {
        if(jwt) {
            // console.log(jwt)
            axios
                .get("http://localhost:3000/fav-books", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data.data)
                        // console.log(typeof res.data.data.items)
                        setFavoriteList(res.data.data)
                        // console.log(favoriteList)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
        // console.log(page)
    }, [jwt])

    useEffect(() => {
        if(jwt) {
            axios
                .get("http://localhost:3000/finished-books", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data.data)
                        // console.log(typeof res.data.data.items)
                        setFinishedList(res.data.data)
                        // console.log(favoriteList)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [jwt])

    useEffect(() => {
        if(jwt) {
            axios
                .get("http://localhost:3000/wishlist", {headers: {"authorization": "Bearer " + jwt}/*, params: {page: page * 10} */})
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data.data)
                        // console.log(typeof res.data.data.items)
                        setWishList(res.data.data)
                        // console.log(favoriteList)
                    } 
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                });
        }
    }, [jwt])

    const navigate = useNavigate();
    const goToPage = (event: any) => {
        event.preventDefault();
        acquireJwt();
        // console.log(jwt)
        // console.log(event.target.id)
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

    const deleteBook = (event: any) => {
        event.preventDefault();
        // console.log("deleted");
    };

    return (
        <div className="d-flex flex-column align-items-center py-4 w-75">
            <nav className="navbar d-flex w-100">
                <form className="container-fluid justify-content-center">
                    {/* <button className="btn btn-outline-success me-3" type="button">My Books</button> */}
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/home'} id="searchBooksBtn">Search Books</Link>
                    <button className="btn btn-outline-secondary me-3" type="button" id="myProfileBtn">My Profile</button>
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
                                        onDelete={(event: any) => deleteBook(event)}>    
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
                                        onDelete={(event: any) => deleteBook(event)}>
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
                                        onDelete={(event: any) => deleteBook(event)}>
                                    </ListBookCard>)}
                            </div>
                    </div>
                </div>
            </form>
        </div>
    )

}