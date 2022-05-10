import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { connectWallet } from "../../wallet";

const NavBar = () => {

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    var enToken = window.localStorage.getItem("token");
    if (enToken) {
      setIsAuthenticated(true)
      var decode = jwtDecode(enToken);
      console.log("user decoded ", decode);
      setUser(decode)
    } else {
      setIsAuthenticated(false)
      console.log("user not logged in yet");
    }
  }, []);
  const logout = async () => {
    toast("Loggout")
    window.localStorage.removeItem("token")
    setTimeout(() => {
      window.location.href = "/"
    }, 1000);
  }
  return (
    <div>
      <header>
        <div className="container-fluid custom-nav" >
          <nav className="navbar navbar-expand-lg fixed-top" style={{margin:'0 100px'}}>
            <a className="navbar-brand d-sm-block d-none" href="/">
              <img
                src="/images/logo.jpg"
                style={{ height: '60px',borderRadius:'100%', width: 'auto' }}
                className="img-fluid"
                alt="Ruugle"
              />
            </a>
            <a className="navbar-brand d-block d-sm-none" href="/">
              <img
                style={{ height: '60px',borderRadius:'100%', width: 'auto' }}
                src="/images/logo.jpg"
                className="img-fluid"
                alt="Ruugle"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                {
                  user.type == "EOU" ?
                    <li className="nav-item">
                      <Link to="/createevent" className="nav-link">
                        Create Event
                      </Link>
                    </li>
                    : ''
                }
                {
                  user.type == "CU" ?
                    <li className="nav-item">
                      <Link to="/market" className="nav-link">
                        Market
                      </Link>
                    </li>
                    : ''
                }
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/help" className="nav-link">
                    Help
                  </Link>
                </li>
                {
                  isAuthenticated ?

                    <li onClick={logout} className="nav-item">
                      <Link to="#" className="nav-link">
                        Logout
                      </Link>
                    </li> :

                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login/Signup
                      </Link>
                    </li>
                }
                <a
                  style={{ top: "13px", position: 'relative' }}
                  className="btn my-2 my-sm-0 orange-btn"
                  data-target="#registerModalCenter"
                  data-toggle="modal"
                  id="connect"
                  href="/"
                  onClick={e=>connectWallet()}
                >
                  Connect
                </a>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
