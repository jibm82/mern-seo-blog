const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const authRoutes = require("./routes/auth.routes")
const blogRoutes = require("./routes/blog.routes")

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

// Routes middleware
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

// PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
