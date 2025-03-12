const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router();
const User = require("../models/user.js");
const passport =require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/users.js");

router
    .route("/signup")
    .get(wrapasync(usercontroller.rendersignupForm))
    .post(wrapasync(usercontroller.signupbefore))

// Route to render OTP verification page
router.get("/verify-otp", (req, res) => {
    const { email } = req.query;

    if (!email) {
        req.flash("error", "Invalid request. Please try again.");
        return res.redirect("/user/signup");
    }

    // Pass messages from flash to the view
    const messages = req.flash("error").concat(req.flash("success"));
    res.render("users/verifyOtp", { email, messages });
});

// Route to handle OTP verification and user creation
router.post("/verify-otp", usercontroller.verifyOtpAndCreateUser);
    
router.post('/resend-otp', usercontroller.resentopt);

router
    .route("/login")
    .get(wrapasync(usercontroller.renderloginForm))
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{
        failureRedirect:"/user/login" , 
        failureFlash:true
    }),
    usercontroller.loginuser
    )

router.get("/logout",usercontroller.userlogout)

module.exports = router;