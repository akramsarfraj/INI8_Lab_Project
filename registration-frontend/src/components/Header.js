import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <div>
          
            <nav className="navbar navbar-inverse">
                <ul className="nav navbar-nav">
                    <li><Link to={"/"} >Home</Link> </li>
                    <li><Link to="/register">Registration</Link></li>
                </ul>

            </nav>
        </div>
    )
}

export default Header