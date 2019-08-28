const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport config
require("./config/passport")(passport);

//db config
const db = require("./config/keys").mongoURI;

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//add passport middleware
app.use(passport.initialize());

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));
