const express = require("express")
const router = express.Router()
const { signUp } = require("../controllers/auth.controller")

// Validators
const { runValidation } = require("../validators")
const { userSignUpValidator } = require("../validators/auth.validator")

router.post("/sign-up", userSignUpValidator, runValidation, signUp)

module.exports = router
