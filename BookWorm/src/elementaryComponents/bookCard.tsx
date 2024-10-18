import React from "react";

export default function BookCard(props: any) {
    return(
        <div className="card mb-3 mt-3" style={{width: "650px", height: "350px"}}>
            <div className="row g-0 overflow-auto">
                <div className="card-header d-flex justify-content-between align-items-center" style={{height: "25%"}}>
                    <div className="row w-100 d-flex align-items-center">
                        <div className="col">
                            <button className="btn p-2" type="button" onClick={props.onAddToList} id="favBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                </svg><span className="mx-1">Favorite</span>
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn p-2" type="button" onClick={props.onAddToList} id="finBtn">Finished Reading</button>
                        </div>
                        <div className="col">
                            <button className="btn p-2" type="button" onClick={props.onAddToList} id="wishBtn">Add to Wishlist</button>
                        </div>
                        <div className="col">
                            <button className="btn p-2" type="button" onClick={props.onClickRead}>Read Now</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{height: "85%"}}>
                    <img src={props.thumbnail} className="img-fluid rounded-start sticky-top w-100 h-100" alt="..."/>
                </div>
                <div className="col-md-8 overflow-auto" style={{height: "85%"}}>
                    <div className="card-body h-100">
                        <h2 className="card-title">{props.title}</h2>
                        <h4 className="card-text">{props.author}</h4>
                        <p className="card-text">Description: {props.description}</p>
                        <p className="card-text"><small className="text-body-secondary">Publisher: {props.publisher}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Year: {props.yearPublished}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Identifier: {props.industryID}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Categories: {props.categories}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Language: {props.language}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Pages: {props.pageCount}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}