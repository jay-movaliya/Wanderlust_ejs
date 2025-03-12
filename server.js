if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express =require("express");
const cors = require("cors");
const path = require("path");
const connected =require("./db/index.js");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ApiError = require("./utils/ApiError.js");
const listingrouter = require("./routes/listings.js");
const reviewrouter = require("./routes/reviews.js");
const session = require("express-session");
const cookie = require("express-session/session/cookie.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userrouter = require("./routes/user.js");
const searchrouter = require("./routes/searchdata.js");

// const nodemailer = require("nodemailer");

const app = express();
const port = 5000;


connected();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());


// app.get('/',(req,res)=>{
//     res.send("Welcome to wanderlust!");
// })

const sessionOption = {
    secret : "mysecretcode",
    resave: false,
    saveUninitialized : false,
    cookie : {
        expire : Date.now() + 7*24*60*60*1000 ,
        maxAge : 7*24*60*60*1000 , 
        httpOnly : true
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
    // console.log(res.locals.success,res.locals.error);
})


app.use("/listings",listingrouter);
app.use("/listings/:id/reviews",reviewrouter);
app.use("/user",userrouter);
app.use("/data/searchbar",searchrouter);

app.all("*",(req,res,next)=>{
    next(new ApiError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something Went Wrong!"} = err;
    if (res.headersSent) {
        return next(err); // Ensure it passes if headers are already sent
    }
    res.render("error.ejs",{message});
})

const servers = app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

servers.setTimeout(120000);