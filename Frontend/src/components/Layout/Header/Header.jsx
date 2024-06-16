import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import UserOptions from "./UserOptions";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";

import logo from "../../../images/logo.png"

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
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
            {isAuthenticated ? (
            <div className="user-options-container">
              <UserOptions user={user} />
            </div>
          ) : (
            <NavLink to="/login">
              <PersonIcon  className="login"/>
            </NavLink>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
