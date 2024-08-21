const express=require("express");
const { sendemailcontroller } = require("../../../controller");

const router = express.Router();

router.get('/sendemail',
    sendemailcontroller.sendEmail
)