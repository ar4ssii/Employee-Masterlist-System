import React from "react";
import { Link, Routes, Route } from 'react-router-dom';


function Header() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}
export default Header;