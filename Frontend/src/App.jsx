import './App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'

import Home from './components/Home/Home';

import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';

import LoginSignUp from './components/User/LoginSignUp';
import Profile from "./components/User/Profile"
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';

import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';

import ProtectedRoute from './components/Routes/ProtectedRoute'

import store from "./store"
import { loadUser } from "./actions/userAction"

import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import OrderSuccess from "./components/Cart/OrderSuccess";
import Pay from './components/Cart/Pay'

import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Contact from './components/Layout/Contanct/Contact';
import About from './components/Layout/About/About';
import NotFound from './components/Layout/NotFound/NotFound';

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  // if(user.role == 'admin'){
  //   setIsAdmin(true);
  // }

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka']
      }
    });
  dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />
        <Route path="/process/payment" element={<ProtectedRoute element={<Pay />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} element={<ProductList />} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} element={<NewProduct />} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} element={<OrderList />} />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} element={<ProcessOrder />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} element={<UsersList />} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} element={<ProductReviews />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
