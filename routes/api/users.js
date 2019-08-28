const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

const validateRegisterInput = require("../../validation/register");
const validateloginInput = require("../../validation/login")

/*
@route  POST api/user/register
@desc   to register a new user
@access     Public

@ api error response
    Status: 400, {string } email 
    Status: 500, {string } error

@api success response example
    status: 200,
    { 
    "_id": "5d44b13a1ef0ed2868caae71",
    "name": "Godwin Otokina",
    "email": "otokinaodafe@gmail.com",
    "avatar": "//www.gravatar.com/avatar/02e9890d236377853eeb148d4b074023?s=200&r=pg&d=mm",
    "password": "$2a$10$IgGolLSAvSuGC3kzs9C",
    "date": "2019-08-02T21:55:06.092Z",
    }

*/

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json( errors );
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = `User with email ${req.body.email} already exists`;
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, //size
        r: "pg", //rating
        d: "mm" //deafault
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "An error occurred please try again" });
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              console.log(err);
              res
                .status(500)
                .json({ error: "An error occurred please try again" });
            });
        });
      });
    }
  });
});

/*
@route  POST api/user/login
@desc   to login a new user
@access     Public, Not logged in

@ api error response
    Status: 400, {string } email 
    Status: 500, {string } error

@api success response example
    status: 200,
    { 
    
    }

*/
router.post("/login", (req, res) => {
  const { errors, isValid } = validateloginInput(req.body);

  if (!isValid) {
    return res.status(400).json( errors );
  }

  const email = req.body.email;
  const password = req.body.password;

  //check if user exists and match the password to login
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'user not found';
        return res.status(404).json(errors);
      }

      //match the password now
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // return res.json({ msg: "password match" });
          //the password match, create the jwt payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          //sign the jwt token
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: "An error occurred while generating token, try again"
              });
            }
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password is incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ error: "an error ocurred please try again" });
    });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({
      id,
      name,
      email
    });
  }
);

module.exports = router;
