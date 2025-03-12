const User = require("../models/user.js");
const { sendOtpEmail } = require("./mail.js");
const otpStore = new Map();
const rotpstore = new Map();

module.exports.rendersignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signupbefore = async (req, res) => {
    try {
        const { email, username, password, confirmpassword } = req.body;

        // Check if passwords match
        if (password !== confirmpassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect("/user/signup");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (existingUser) {
            req.flash("error", "A user with the given email or username already exists.");
            return res.redirect("/user/signup");
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        // console.log("Generated OTP:", otp);

        // Send OTP via email
        await sendOtpEmail(email, otp);

        // Store OTP in memory (or Redis)
        otpStore.set(email, { otp, password, username, expiresAt: Date.now() + 5 * 60 * 1000 });

        req.flash("success", "OTP sent successfully to your email.");
        return res.redirect(`/user/verify-otp?email=${email}`);
    } catch (error) {
        console.error("Error in generating OTP:", error);
        req.flash("error", "Something went wrong. Please try again.");
        return res.redirect("/user/signup");
    }
};


module.exports.resentopt = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        req.flash('error', 'Email is required to resend OTP.');
        return res.redirect(`/user/verify-otp?email=${email}`);
    }

    try {
        // Generate a new OTP and set the expiration time
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        // console.log("old :" , otpStore.get(email).otp);
        // Store the new OTP with expiration time in otpStore
        // console.log(otpStore);
        const storedOtpData = otpStore.get(email);
        const { username, password } = storedOtpData;
        otpStore.set(email, { otp,password, username, expiresAt:Date.now() + 5 * 60 * 1000});
        // console.log(otpStore);
        // console.log("new :" , otpStore.get(email).otp);
        // Send OTP to user's email using sendOtpEmail function
        await sendOtpEmail(email, otp); // Send the OTP via your sendMail function

        req.flash('success', 'A new OTP has been sent to your email.');
        return res.redirect(`/user/verify-otp?email=${email}`);
    } catch (error) {
        console.error("Error in resending OTP:", error);
        req.flash('error', 'Error sending OTP. Please try again.');
        return res.redirect(`/user/verify-otp?email=${email}`);
    }
}

module.exports.verifyOtpAndCreateUser = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Check if OTP exists and is valid in otpStore
        if (!otpStore.has(email)) {
            req.flash("error", "OTP expired or invalid. Please request a new one.");
            return res.redirect(`/user/verify-otp?email=${email}`);
        }

        const storedOtpData = otpStore.get(email);
        
        // console.log("stored :" , otpStore.get(email).otp,"entered",otp);
        // Check if OTP matches and is not expired
        if (storedOtpData.otp !== parseInt(otp) || Date.now() > storedOtpData.expiresAt) {
            req.flash("error", "Invalid or expired OTP. Please try again.");
            console.log("Type of storedOtpData.otp:", typeof storedOtpData.otp);
            console.log("Type of entered OTP:", typeof otp);
            return res.redirect(`/user/verify-otp?email=${email}`);
        }

        // If OTP is valid, create the user
        const { username, password } = storedOtpData;

        const newUser = new User({ email, username, isverified: true });
        const registeredUser = await User.register(newUser, password);

        // Remove OTP from store after successful verification
        otpStore.delete(email);

        // Automatically log the user in
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            return res.redirect("/listings");
        });
    } catch (error) {
        console.error("Error in verifying OTP and creating user:", error);
        req.flash("error", "Something went wrong. Please try again.");
        return res.redirect("/user/signup");
    }
};


module.exports.renderloginForm = (req,res)=>{
    res.render("users/login.ejs");
}


module.exports.loginuser = async(req,res,)=>{
    req.flash("success","Welcome back to Wanderlust! You are Logged in.");
    res.redirect(res.locals.redirecturl);
}

module.exports.userlogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out successfully!");
        res.redirect("/listings");
    })
}