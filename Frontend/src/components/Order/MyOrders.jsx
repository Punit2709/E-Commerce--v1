import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";

import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const {
    loading: userLoading,
    user,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        let { status } = params.row;
        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(myOrders());
    }
  }, [dispatch, alert, error, isAuthenticated]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading || userLoading ? (
        <Loader />
      ) : (
        isAuthenticated && (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10, 15, 20]}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        )
      )}
    </Fragment>
  );
};

export default MyOrders;
