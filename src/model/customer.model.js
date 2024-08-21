const { pool } = require("../db/mysql")

const customermodel=async()=>{
    console.log("sdajkf");
    try {
        console.log("on");
        const customer =await pool.execute('SELECT * FROM customer')

        return customer

    } catch (error) {
        
    }
    module.exports={
        customermodel
    }
}