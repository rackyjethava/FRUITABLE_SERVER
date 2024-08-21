const express=require("express")


const router = express.Router();

const categoriesRouts=require("./categories.routs")
const subcategoriesRouts=require("./subCategories.routs")
const productRouts=require("./products.routes")
const variantsRouts=require("./variants.route")
const salsepepoleRouts=require("./salsepeople.routs")
const usersRouts=require("./users.routs")
// const ordersRouts=require("./order.routs")
// const custemorRouts=require("./customer.routs")


router.use("/categories",categoriesRouts)
router.use("/sub_categories",subcategoriesRouts)
router.use("/products",productRouts)
router.use("/variants",variantsRouts)
router.use("/salsepeople",salsepepoleRouts)
router.use("/users",usersRouts)
// router.use("/orders",ordersRouts)
// router.use("/custemer",custemorRouts)




module.exports=router