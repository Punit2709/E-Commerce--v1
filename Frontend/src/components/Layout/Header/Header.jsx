import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Header.css";
import "./Navbar.css";
import UserOptions from "./UserOptions";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReorderIcon from "@mui/icons-material/Reorder";

import logo from "../../../images/logo.png";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <header>
        <nav>
          <div className="logo-div">
            <NavLink to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </div>
        
          <div className={showMediaIcons ? "mobile-nav-menu nav-menu" : "nav-menu"}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/search"> <SearchIcon /></NavLink>
              </li>
              <li>
                <NavLink to="/cart"> < ShoppingBagIcon/></NavLink>
              </li>
              <li>
                {isAuthenticated ? (
                  <div>
                    <UserOptions user={user} />
                  </div>
                ) : (
                  <NavLink to="/login">
                    <PersonIcon />
                  </NavLink>
                )}
              </li>
            </ul>
          </div>

          <div className="right-menu">
            <div className="hamburger">
              <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <ReorderIcon />
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
