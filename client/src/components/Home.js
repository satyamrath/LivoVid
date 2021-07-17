import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isProcessed, setIsProcessed] = useState(false);
    const [metadatas, setMetadatas] = useState([]);

    useEffect(() => {
        fetch('/getVideos', {
            method: "GET"
        }).then((response) => {
            response.json().then(response => {
                setIsProcessed(true);
                setMetadatas(response);
                // console.log(response);
            }).catch(err => {
                console.log(err.message);
            })
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    return isProcessed?((
        <>        
            <div className="container my-5 videoList">
                <div className="row">
                    {metadatas.map(metadata => (
                        <div className="card mx-auto my-5 bg-transparent text-light" style={{"width": "18rem"}} key={ metadata._id }>
                            <div className="card-body">
                                <h5 className="card-title text-center">{ metadata.title }</h5>
                            </div>
                            <Link to={"/watch?id=" + metadata._id } className="btn btn-outline-light mt-5 mb">Watch</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )):
    (
        <>
            <div className="text-center my-5">
                <div className="spinner-grow text-light" style={{"width": "3rem", "height": "3rem"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}
