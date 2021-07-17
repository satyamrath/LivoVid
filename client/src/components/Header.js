import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-transparent">
            <div className="mx-auto mt-4">
                <Link className="navbar-brand mx-3" to="/"><b>LivoVid</b></Link>
                <Link className="navbar-brand mx-3" to="/"><b>Home</b></Link>
            </div>
        </nav>
    )
}
