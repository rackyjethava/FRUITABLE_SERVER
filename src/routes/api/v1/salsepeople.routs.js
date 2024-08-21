const express=require("express");
const { SalsepeopleController } = require("../../../controller");


const router = express.Router();


router.get(
    "/get-salsepeople",
    SalsepeopleController.listSalsepeople
)

router.post("/add-salespeople",
     SalsepeopleController.addSalsepeople
)

router.delete(
    "/delete-salespeople/:SNUM",
    SalsepeopleController.deletesalsepeople
)

router.put("/update-salespeople/:SNUM",
    SalsepeopleController.updateSalespeople
);

module.exports=router