import React from "react";

// React component serving as a card for each book stored in one of three book category tables in the local MySQL database (favorites, wishlist, finished reading)
export default function ListBookCard(props: any) {
    return(
        <div className="card mb-3 mt-3 w-100" style={{width: "800px", height: "200px"}}>
            <div className="row g-0 overflow-auto">
                <div className="col-md-4">
                    <img src={props.thumbnail} className="img-fluid rounded-start sticky-top w-100 h-100" alt="..."/>
                </div>
                <div className="col-md-7 overflow-auto">
                    <div className="card-body h-100">
                        <h2 className="card-title">{props.title}</h2>
                        <h4 className="card-text">{props.author}</h4>
                        <p className="card-text"><small className="text-body-secondary">Publisher: {props.publisher}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Year: {props.yearPublished}</small></p>
                        <p className="card-text"><small className="text-body-secondary">Identifier: {props.industryID}</small></p>
                    </div>
                </div>
                <div className="col-md-1">
                    <div onClick={props.onDelete}>
                        <i className="icon-trash p-1 mr-3 mt-3 icon-large" role="button"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}