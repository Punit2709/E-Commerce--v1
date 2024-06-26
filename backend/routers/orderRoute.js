const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authentication')
const {createOrder, getSingleOrders, myOrders, getAllOrders,  updateOrder, deleteOrder} = require('../controller/orderController')

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrders);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;