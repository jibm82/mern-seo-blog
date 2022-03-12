const User = require("../models/user.model")
const shortId = require("shortid")

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