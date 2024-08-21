var jwt = require('jsonwebtoken');
const Users = require('../model/users.model');
const auth=(role=[])=>async (req,res,next)=>{

    try {
        const token=req.cookies.accsesstoken || req.header("Authorization")?.replase("Bearer","")   

        if(!token){
            return res.status(401).json
            ({
                message:"Please login to access this resource."
            })
        }

        try {

            const tokancheq=await jwt.verify(token,"rakeshiscool")

            console.log(tokancheq);

            const users=Users.findById(tokancheq._id)

            if(!role.some((v)=>v.role===users.role)){
                return res.status(401).json
                ({
                    sucsess:false,
                    message:"invalid user."
                })

            }

            req.users=users

            next()
            
        } catch (error) {
            return res.status(400).json
            ({
                status:false,
                message:"invalid accsesstokan"
            })
        }
        
    } catch (error) {
        return res.status(500).json
        ({
            status:false,
            message:"internal server error"
        })
    }
}
module.exports=auth