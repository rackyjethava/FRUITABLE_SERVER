const express=require("express");
const { SubcategoryController } = require("../../../controller");


const router = express.Router();


router.get(
    "/list-subcategories/:subcategory_id",
    SubcategoryController.getsubcategory
)

router.get(
    "/list-subcategories",
    SubcategoryController.listsubCategories
    
)

router.post(
    "/add-subcategory",
    SubcategoryController.addsubCategory
)


router.put(
    "/update-subcategory/:subcategory_id",
    SubcategoryController.updatesubCategory

)

router.delete(
    "/delete-subcategory/:subcategory_id",
    SubcategoryController.deletesubCategory
)

router.get(
    "/count-product",
    SubcategoryController.countSubcategory
)

module.exports=router