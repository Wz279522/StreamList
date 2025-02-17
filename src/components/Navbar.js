import React from "react";
import { Link } from "react-router-dom";
import streamlistIcon from "../icons/streamlist.png";
import aboutIcon from "../icons/about.png";
import moviesIcon from "../icons/movies.png";
import cartIcon from "../icons/shoppingcartcheckout.png";
import searchIcon from "../icons/search.png"; // ✅ Added search icon

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img
              src={streamlistIcon}
              alt="StreamList"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            StreamList
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <img
              src={moviesIcon}
              alt="Movies"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <img
              src={cartIcon}
              alt="Cart"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img
              src={aboutIcon}
              alt="About"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            About
          </Link>
        </li>
        <li>
          <Link to="/search"> {/* ✅ Added Search Movies Link */}
            <img
              src={searchIcon}
              alt="Search Movies"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            Search Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

