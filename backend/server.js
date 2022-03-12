const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

// Create app
const app = express()

// db
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
  }
).then(() => console.log('DB connected'))

// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

// CORS
if(process.env.NODE_ENV == 'development') {
  app.use(cors({
    origin: `${process.env.CLIENT_URL}`
  }))
}

// Routes
app.get("/api", (_req, res) => {
  res.json({ time: Date().toString() })
})

// PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
