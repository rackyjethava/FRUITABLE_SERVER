require('dotenv').config()
const express = require("express")
const app = express()
const routs = require("./routes/api/v1/index")
const connectDB = require("./db/mongoosedb")
const cookieParser = require('cookie-parser')
const cors = require('cors')

const passport = require("passport")
const {Googlelogin,facebooklogin}=require("./utils/provider")
const connectchat = require("./utils/soketIO")
YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./src/api.yaml');



app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:3000",
   credentials: true,
}))
app.use(express.json())
app.use(require('express-session')
   ({
      secret: 'yehhhhhhhhhh',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false }
   }));
app.use(passport.session());
app.use(passport.initialize());

app.use("/api/v1", routs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


connectDB()
Googlelogin()
facebooklogin()
connectchat()

app.listen(8000, () => {
   console.log("server is running on port 8000")
})

