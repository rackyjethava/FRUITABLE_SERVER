const { SalespeopleModel } = require("../model");



const listSalsepeople=async(req,res)=>{
    console.log("asijd");
    try {
      
        console.log("ok");
        // console.log("got it",salsepeoplemodel);
        const Salespeople=await SalespeopleModel.salespeopleModel()
        console.log("not");

        res.status(200).json({
            success: true,
            message: "Salespeople data fetched successfully",
            data: Salespeople,
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error occurred while fetching salespeople data: ",
            error: error.message 
        });
    }
}

const addSalsepeople = async (req, res) => {

    const {SNAME, CITY, COMM} = req.body

    const response = await SalespeopleModel.addSalespeople(SNAME, CITY, COMM)

    res.status(201).json({
        success: true,
        message: "Salespeople data ADD successfully",
        data: response,
    })
}

const deletesalsepeople=async(req,res)=>{
    try {
        const {SNUM}=req.params

        const response=await SalespeopleModel.deleteSalespeople(SNUM)

        res.status(201).json({
            success: true,
            message: response.massage
        })

    } catch (error) {
        res.status(500).json({
            success: FALSE,
            message: "ERROR FOR DELETE SALSEPOPLE",
            error:error.massage
        })
        
    }
}

const updateSalespeople = async (req, res) => {
    const { SNUM } = req.params;
    const { SNAME, CITY, COMM } = req.body;
    try {
        const response = await SalespeopleModel.updateSalespeople(SNUM, SNAME, CITY, COMM)
        res.status(200).json({
            success: true,
            message: "Salespeople data updated successfully",
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while updating salespeople data",
            error: error.message
        });
    }
}
module.exports={
    addSalsepeople,
    listSalsepeople,
    deletesalsepeople,
    updateSalespeople
}


