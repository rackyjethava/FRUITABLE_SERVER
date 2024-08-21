const express = require('express');
const { UsersController } = require('../../../controller');
const passport = require('passport');
const pdfmake = require('../../../utils/pdfmake');
const upload = require('../../../middelware/upload');
const { varifyaccesRefTokan } = require('../../../controller/users.controller');



const router = express.Router();



router.post(
    '/register',
    // upload.single("profile"),
    UsersController.register
);

router.post(
    '/login',
    UsersController.login
);

router.post(
    '/logout',
    UsersController.logout
);

router.post(
    '/get-refreshtokan',
    UsersController.getRefreshToken
);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', "email"] }));

router.get('/google/callback',
    passport.authenticate('google', 
        { failureRedirect: '/login' }
    ),
    async function (req, res) {
       console.log(req.isAuthenticated());
       console.log(req.session);
       console.log(req.user);
       
       
       const { accsesstoken, refreshToken } = await varifyaccesRefTokan(req.session.passport.user._id)

       const refreshoption = {
           httpOnly: true,
           secure: true,
           samSite:"None",
           maxAge: 60 * 60 * 24 * 7
       }

       const Acesssoption = {
           httpOnly: true,
           secure: true,
           samSite:"None",
           maxAge: 60 * 60 * 1000
       }

       res.status(200).
           cookie("accsesstoken", accsesstoken, Acesssoption).
           cookie("refreshToken", refreshToken, refreshoption).
           redirect("http://localhost:3000/")
          

    });

router.get('/facebook',
    passport.authenticate('facebook',{ scope: ['public_profile', "email"] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', 
        { failureRedirect: '/login' }
    ),
    function (req, res) {
        console.log(req.isAuthenticated());
        console.log(req.session);
        
        
        res.send("<h1>ok</h1>")
    });


 router.get(
    '/pdfmake',pdfmake
 )   

 router.get(
    '/chaekAuth',
    UsersController.checkAuth
 )


module.exports = router