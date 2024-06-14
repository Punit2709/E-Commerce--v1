import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, deleteUpdateProductReducer, reviewReducer, productReviewsReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer} from "./reducers/cartReducer";
import { allOrdersReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { getAdminProducts, getAllReviews } from "./actions/productAction";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user:userReducer, 
  profile: profileReducer,  
  forgotPassword: forgotPasswordReducer, 
  cart: cartReducer,
  newOrder: newOrderReducer, 
  myOrders: myOrderReducer, 
  orderDetails: orderDetailsReducer, 
  newReview: newReviewReducer, 
  newProduct: newProductReducer, 
  updProduct: deleteUpdateProductReducer,
  allOrders: allOrdersReducer, 
  order: orderReducer, 
  allUsers: allUsersReducer, 
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review:reviewReducer,


});

let initialState = {
  cart:{
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
  }
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
