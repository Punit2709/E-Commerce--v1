const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
        paidAt: Date.now()
    });

    res.status(201).json({
        success: true,
        message: 'Order Created Successfully',
        order
    })
});

exports.getSingleOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(404, 'Order not Found'));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get Loogin User Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler(404, 'Noo Order Found'))
    }

    res.status(200).json({
        success: true,
        orders
    });
})

// get all Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});


// update Orders -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        // o : order, updateStock of Product which is shipped
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


// delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    
    res.status(200).json({
      success: true,
      message : 'Order Deleted Successfully'
    });
  });