// creating token and saving in cookie

const sendJWTToken = (user, statusCode, message, res) =>{
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24
        ), 
        httpOnly: true
    }
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message, 
      token,
      user
    });
}

module.exports = sendJWTToken;