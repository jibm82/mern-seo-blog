const express = require("express")
const router = express.Router()
const {
  signUp, signIn, signOut, requireSignIn
} = require("../controllers/auth.controller")

// Validators
const { runValidation } = require("../validators")
const {
  userSignUpValidator, userSignInValidator
 } = require("../validators/auth.validator")

router.post("/sign-up", userSignUpValidator, runValidation, signUp)
router.post("/sign-in", userSignInValidator, runValidation, signIn)
router.get("/sign-out", signOut)

router.get("/secret", requireSignIn, (req, res) => {
  res.json({
    message: "You have access to secret page"
  })
})

module.exports = router
