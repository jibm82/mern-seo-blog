const User = require("../models/user.model")
const shortId = require("shortid")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.signUp = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).exec((_err, user) => {
    if(user) {
      return res.status(400).json({
        error: "Email is taken"
      })
    }

    const username = shortId.generate()

    const profile = `${process.env.CLIENT_URL}/profile/${username}`

    const newUser = new User({ name, email, password, profile, username})

    newUser.save((err, success) => {
      if(err) {
        return res.status(400).json({
          error: err
        })
      }

      // res.json({
      //   user: success
      // })

      res.json({
        message: "Sign up success! Please sign in"
      })
    })
  })
}

exports.signIn = (req, res) => {
  const { email, password } = req.body
  // Check if user exists
  User.findOne({ email }).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User with that email does not exists. Please sign up"
      })
    }

    // Authenticate
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }

    // Generate jwt
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.cookie('token', token, { expiresIn: "1d" })

    const { _id, username, name, email, role } = user;
    res.json({
      token,
      user: { _id, username, name, email, role },
    })
  })
}

exports.signOut = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "Sign out success"
  })
}

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})