import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../Layout/MetaData.jsx";
import Loader from "../Layout/Loader/Loader.jsx";
import { getProduct, clearErrors } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from "react-alert";

const Home = () => {
  return (
    <Fragment>
        Home
    </Fragment>
  );
};

export default Home;
