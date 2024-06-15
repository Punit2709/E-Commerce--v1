import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import logo from "../../../images/logo.png"

const Header = () => {
  return (
    <>
      <header>
      <div className="container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <nav>
          <ul className="nav-links">
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
          </ul>
        </nav>
        <div className="search-profile-cart">
          <NavLink to="/search">
            <SearchIcon className="search" />
          </NavLink>
          <NavLink to="/cart">
            <ShoppingBagIcon  className="cart"/>
          </NavLink>  
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
