exports.signUp = (req, res) => {
  const { name, email, password } = req.body

  res.json({
    user: {
      name, email, password, hola: 1,
    }
  })
}