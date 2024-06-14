import './App.css';
import axios from 'axios';
import WebFont from 'webfontloader'
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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

  const { isAuthenticated, user } = useSelector(state => state.user);

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

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products/details/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/account' element={<Profile />} />
        <Route exact path='/me/update' element={<UpdateProfile />} />
        <Route exact path='/password/update' element={<UpdatePassword />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/shipping' element={<Shipping />} />
        <Route exact path='/process/payment' element={<Pay />} />
        <Route exact path='/success' element={<OrderSuccess />} />
        <Route exact path='/orders' element={<MyOrders />} />
        <Route exact path='/order/:id' element={<OrderDetails />} />
        <Route exact path='/order/confirm' element={<ConfirmOrder />} />

        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/admin/products' element={<ProductList />} />
        <Route exact path='/admin/product' element={<NewProduct />} />
        <Route exact path='/admin/product/:id' element={<UpdateProduct />} />
        <Route exact path='/admin/orders' element={<OrderList />} />
        <Route exact path='/admin/order/:id' element={<ProcessOrder />} />
        <Route exact path='/admin/users' element={<UsersList />} />
        <Route exact path='/admin/user/:id' element={<UpdateUser />} />
        <Route exact path='/admin/reviews' element={<ProductReviews />} />
        <Route  path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
