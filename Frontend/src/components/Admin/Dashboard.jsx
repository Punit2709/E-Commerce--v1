import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../Layout/MetaData";
import "./Dashboard.css";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers, loadUser} from '../../actions/userAction'
import Loader from "../Layout/Loader/Loader";

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, isAuthenticated, navigate]);

  if (user.role !== "admin") {
    navigate("/account");
  }

  let outOfStock = 0;
  let inStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock == 0) {
        outOfStock += 1;
      } else {
        inStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [Number(outOfStock), Number(inStock)],
      },
    ],
  };

  return (
    isAuthenticated && (
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> {totalAmount} ₹
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
