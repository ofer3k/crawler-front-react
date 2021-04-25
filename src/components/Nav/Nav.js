import React from "react"

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <div className="container nav-container">
                <a className="navbar-brand brand" href="#">Crawler</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            README.md
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <p>The role of the crawler is to move around the network and respond to the operator information on demand.
In our technology it is possible to add crawlers in a horizontal way that will do the same job at double or triple speed and so on.</p>
                            </div>
                        </li>

                        {/* <li className="nav-item active">
                            <a className="nav-link" href="#">Why Us <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Support</a>
                        </li> */}

                        {/* <a className="btn btn-outline-dark start" href="#">Get Started</a> */}

                    </ul>


                </div>


            </div>
        </nav>
    );
}

export default Nav;