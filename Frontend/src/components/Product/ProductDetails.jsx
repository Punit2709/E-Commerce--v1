import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

import "./ProductDetails.css";
import Loader from "../Layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import MetaData from "../Layout/MetaData";

import Carousel from "react-material-ui-carousel";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { user} = useSelector(
    (state) => state.user
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  let [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    value: product.rating,
    readOnly: true,
    size: "large",
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      quantity = quantity + 1;
      setQuantity(quantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      quantity = quantity - 1;
      setQuantity(quantity);
    }
  };

  const addToCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {

    if(!user){
      alert.error('Login Required For Review');
      navigate('/login');
    }

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- E-Commerce`} />
          <div className="ProductDetails">
            <div className="carousel-container">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="details-container">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product {`#${product._id}`}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span> ({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="quantity-controls">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" min={1} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    className="add-to-cart"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Yet !!! </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
