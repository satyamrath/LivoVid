import './Watch.css';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

export default function Watch() {
    const [isProcessed, setIsProcessed] = useState(false);
    const [metadata, setMetadata] = useState({});

    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    // console.log('id', id);

    useEffect(() => {
        fetch(`/getDetails?id=${id}`, {
            method: "GET",
        }).then((response) => {
            if(response.ok){
                response.json().then(response => {
                    // console.log(response);
                    setMetadata(response);
                    setIsProcessed(true);
                }).catch(err => {
                    console.log(err.message);
                })
            }else{
                // alert(response.statusText);
                // history.push('/');
            }
        }).catch((err) => {
            console.log(err.message);
            alert(err.message);
        })
    }, [id])

    return isProcessed?((
        <>  
            <div className="watch_videoContainer">
                <video className="watch_videoPlayer" controls autoPlay={true} >
                {/* {"/watch?id=" + metadata._id } */}
                    <source src={"/video/" + metadata.url } type="video/mp4" />
                </video>
                <h5 className="text-light">{ metadata.title }</h5>
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
