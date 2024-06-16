import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../Layout/MetaData.jsx";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch} from 'react-redux'
import Loader from "../Layout/Loader/Loader.jsx";
import Alert from '@mui/material/Alert';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, productsCount, resultPerPage, error } = useSelector(state => state.products)

  useEffect(() => {
    if(error){
      return (<Alert severity="error">{error}</Alert>)
    }
    dispatch(getProduct());
  },[dispatch, error])

  return (
      <Fragment>
        {
          loading ? <Loader /> :
          <Fragment>
          <MetaData title='E-Commerce' />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
          </div>
    
          <h2 className="homeHeading">Featured Products</h2>
    
          <div className="container" id="container">
            {
              products && products.map((product) => (<ProductCard product={product}  key={product._id}/>) )
            }
          </div>
        </Fragment>
        }
      </Fragment>
  );
};

export default Home;
