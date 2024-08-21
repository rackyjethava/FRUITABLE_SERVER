const express=require("express");
const { CategoryController } = require("../../../controller");
const upload = require("../../../middelware/upload");
const auth = require("../../../middelware/auth");
const { otpSend, verifyOtp } = require("../../../utils/otpSend");
const { validat } = require("../../../middelware/validate");
const { validatecontroller } = require("../../../validation");

const router = express.Router();


router.get(
    "/get-categories/:category_id",
    validat(validatecontroller.getCategory),
    verifyOtp,
    CategoryController.getcategory
    
)

router.get(
    "/list-categories",
    otpSend,
    auth(["admin","user"]),
    CategoryController.listCategories
    
)

router.post(
    "/add-category",
    validat(validatecontroller.creatCategory),
    // upload.single("photo"),
    CategoryController.addCategory
)


router.put(
    "/update-category/:category_id",
    validat(validatecontroller.updateCategory),
    CategoryController.updateCategory

)

router.delete(
    "/delete-category/:category_id",
    validat(validatecontroller.deleteCategory),
    CategoryController.deleteCategory
)

router.get(
    "/count-subcategories",
    CategoryController.countsubcategory
);

router.get(
    "/count-active",
    CategoryController.countActivecategory
)

router.get(
    "/most-products",
    CategoryController.mostproduct
)

router.get(
    "/total-products",
    CategoryController.totalproduct
)
router.get(
    "/inactive",
    CategoryController.listnonActivecategory
)


module.exports=router