const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");
const { contains } = require("validator");
const cloudinary = require('cloudinary').v2;

// creating Product : Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  let images = [];
  let imagesLink = [];

  if(typeof req.body.images === 'string'){  
    // type is String that means only single Image is there
    images.push(req.body.images);

  }else{
    // type is Array that means only multi Image is there
    images = req.body.images;
  }

  for (let index = 0; index < images.length; index++) { 
    const result = await cloudinary.uploader.upload(images[index], {
      folder: 'products',
    });

    imagesLink.push({
      public_id: result.public_id, 
      url: result.secure_url,
    })
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ message: "Product Created", success: true, product });
});

// update product : Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting OLD Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, message: "Product Updated", product });
});

// delete product : Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Found"));
  }

  // deleting images from cloudinary
  for(let i = 0; i < product.images.length; i++){
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }


  // deleting product
  await Product.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// get products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  let productsCount = await Product.countDocuments();

  let apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let fillteredProductsCount = products.length;

  apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);

  products = await apiFeature.query;

  res
    .status(200)
    .json({
      success: true,
      productsCount,
      resultPerPage,
      fillteredProductsCount,
      products,
    });
});

// single Product : for details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  res
    .status(200)
    .json({ success: true, product });
});

// create and update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let sumRating = 0;
  product.reviews.forEach((rev) => {
    sumRating += rev.rating;
    return sumRating;
  });
  product.rating = sumRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review Created / Updated Successfully",
  });
});

// get All reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete Product reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sumRating = 0;
  reviews.forEach((rev) => {
    sumRating += rev.rating;
  });

  let rating = 0;
  if(reviews.length === 0){
    rating = 0;
  }else{
    rating = sumRating / reviews.length;
  }

  const numOfReviews = reviews.length;

  const udPro = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      rating,
      numOfReviews,
      reviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted",
  });
});

// Admin Products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

  const products = await Product.find();

  res
    .status(200)
    .json({
      success: true,
      products,
    });
});

