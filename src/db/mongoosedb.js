const mongoose = require('mongoose');

const   connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("connected to db")
        })
        .catch((error)=>{
            console.log("not connected to db",error)
        })
    } catch (error) {
        console.log("not connected to db",error)
    }
}

module.exports=connectDB