require('dotenv').config()
const express = require("express")
const app = express()
const routs = require("./routes/api/v1/index")
const connectDB = require("./db/mongoosedb")
const cookieParser = require('cookie-parser')
const cors = require('cors')

const passport = require("passport")
const {Googlelogin,facebooklogin}=require("./utils/provider")
// const connectchat = require("./utils/soketIO")
YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = YAML.load('./src/api.yaml');


app.use(cookieParser())
Googlelogin()
facebooklogin()
const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
    '/api/docs',
    express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            url: '/public/api.yaml' // Path to your YAML file
        }
    })
);


connectDB()
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
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connectchat()
app.use('/', (req, res) => {
   res.send('hello world')
})

app.listen(8000, () => {
   console.log("server is running on port 8000")
})

