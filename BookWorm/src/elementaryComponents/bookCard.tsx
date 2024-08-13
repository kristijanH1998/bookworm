import React from "react";

export default function BookCard(props: any) {
    return(
        <div className="card mb-3 mt-3" style={{maxWidth: "750px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.thumbnail} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{props.title}</h2>
                        <h4 className="card-text">{props.author}</h4>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-body-secondary">Year: {props.yearPublished}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}