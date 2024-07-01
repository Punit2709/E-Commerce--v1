# E-Commerce Web Application

## Routes

### 1. User Route

1. **Register**: `/api/v1/register`
2. **Login**: `/api/v1/login`
3. **View Profile**: `/api/v1/me`
4. **Update Profile**: `/api/v1/me/update`
5. **Forgot Password**: `/api/v1/password/forgot`
6. **Reset Password**: `/api/v1/password/update`
7. **Reset Pass Token**: `/api/v1/password/reset/:token`

### Admin Handle Users

8. **Get All Users**: `/api/v1/admin/users`
9. **Get Specific User**: `/api/v1/admin/user/:id` - GET
10. **Update User**: `/api/v1/admin/user/:id` - PUT
11. **Delete User**: `/api/v1/admin/user/:id` - DELETE

### 2. Product Routes

1. **Get All Products**: `/api/v1/admin/products`
2. **Get Specific Product**: `/api/v1/products/details/:id`
3. **Create Product**: `/api/v1/admin/products/create`
4. **Update Product**: `/api/v1/admin/products/update/:id`
5. **Delete Product**: `/api/v1/admin/products/delete/:id`

### 3. Reviews

1. **Get All Reviews**: `/api/v1/reviews`
2. **Get User Specific Review**: `/api/v1/review`
