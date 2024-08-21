const Users = require("../model/users.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const sendEmail = require("./sendemail.cotroller");

const varifyaccesRefTokan = async (id) => {
    try {

        const user = await Users.findById(id)

        console.log(user);


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid request"
            })
        }

        const accsesstoken = await jwt.sign(
            {
                _id: user._id,
                role: user.role,
                expiresIn: '1 h'
            },
            process.env.ACCSESS_TOKEN_KEY,
            { expiresIn:  60 * 60 * 1000 }
        );

        const refreshToken = await jwt.sign(
            { _id: user._id, },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn:  60 * 60 * 24 * 7 }
        )

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        console.log(accsesstoken, refreshToken, "accsess");

        return { accsesstoken, refreshToken }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        
        // console.log(req.file);
        

        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }

        // console.log(user, "user is not defind");
        const hashPassword = await bcrypt.hash(password, 10)

        const userData = await Users.create({ ...req.body, password: hashPassword})

        if (!userData) {
            return res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const userDataF = await Users.findById({ _id: userData._id }).select("-password")

        // try {
        //     await sendEmail(userDataF.email, "message sent")
        // } catch (error) {
        //     console.log(error, "not send");
        // }

        if (!userDataF) {
            return res.status(500).json({
                success: false,
                message: "internal server error" + error.message
            })
        }

        res.status(201).json({
            success: true,
            message: "ragister succesfully",
            data: userDataF
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not exist"
            })
        }

        console.log(user);

        const validaccestokan = await bcrypt.compare(password, user.password)

        console.log(validaccestokan);

        if (!validaccestokan) {
            return res.status(401).json({
                success: false,
                message: "invalid password"
            })
        }


        const { accsesstoken, refreshToken } = await varifyaccesRefTokan(user._id)
        const userDataF = await Users.findById({ _id: user._id }).select("-password -refreshToken")

        const refreshoption = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7
        }

        const Acesssoption = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000
        }

        res.status(200).
            cookie("accsesstoken", accsesstoken, Acesssoption).
            cookie("refreshToken", refreshToken, refreshoption).
            json({
                success: true,
                message: "login success",
                data: {
                    ...userDataF.toObject(),
                    accsesstoken,
                }
            })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        console.log(req.body._id);
        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset:
                    { refreshToken: 1 }
            },
            {
                new: true
            }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not logged out"
            })
        }
        res.status(200).
        clearCookie("accsesstoken").
        clearCookie("refreshToken").
        json({
            success: true,
            message: "logout success",
         
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}

const getRefreshToken = async (req, res) => {
    try {
        console.log(req.cookies.refreshToken);
        const tokandata = await jwt.verify(req.cookies.refreshToken, process.env.ACCSESS_TOKEN_KEY)

        console.log(tokandata, "asdgyaus");

        if (!tokandata) {
            return res.status(401).json({
                success: false,
                message: "invalid token"
            })
        }
        const user = await Users.findById(tokandata._id)
        console.log(user, "ajikshd");


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not get"
            })
        }

        const datau = await varifyaccesRefTokan(user._id);
        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(401).json({
                success: false,
                message: "invalid refresh token"
            })

        }

        console.log(datau.accsesstoken, datau.refreshToken);

        const refreshoption = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7
        }

        const Acesssoption = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000
        }
        res.status(200).
            cookie("accsesstoken", datau.accsesstoken, Acesssoption).
            cookie("refreshToken", datau.refreshToken, refreshoption).
            json({
                success: true,
                message: "login success",
                data: { ccsesstoken: datau.accsesstoken },

            })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }

}

const checkAuth=async(req,res)=>{
    console.log("i am in");
    
    try {

        console.log("i have ",req.cookies.accsesstoken);
    
        if(!req.cookies.accsesstoken){
            return res.status(401).json({
                success: false,
                message: "cant get acsesstoken"
                })
         }
        
         const tokandata = await jwt.verify(req.cookies.accsesstoken,"rakeshiscool")
         if(!tokandata){
            return res.status(400).json({
                success: false,
                message: "unauthorized"
                })
         }

        

         return res.status(200).json({
            success: true,
            message: "user authorized",
            data: tokandata,
         })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }

}

module.exports = {
    register,
    login,
    getRefreshToken,
    logout,
    checkAuth,
    varifyaccesRefTokan
}