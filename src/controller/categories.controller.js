const Categories = require("../model/categories.model");
const foldername = require("../utils/cloudinary");
const { otpSend } = require("../utils/otpSend");

const listCategories=async(req,res)=>{
  console.log(req.users);
    try {

      // let page=parseInt(req.query.page)
      // let pagesize=parseInt(req.query.pagesize)

      // console.log(page,pagesize);
  

      
      // otpSend();
        const categories=await Categories.find()
        

        if(!categories || categories.length===0){
            res.status(404).json({
                succsess:false,
                message:"No categories found"
            })
        }
        // let skip=page(-1)*pagesize


        res.status(200).json({
            succsess:true,
            massage:'category data found',
            data:categories
        })
    } catch (error) {
        res.status(500).json({
            succsess:false,
            message:"Internal server error"+error.message
        })
    }
}

const getcategory= async(req,res)=>{
  console.log(req.users);
    try {
        const category=await Categories.findById(req.params.category_id)

        if(!category){
            res.status(404).json({
                succsess:false,
                message:"No category found"
                })
        }
        res.status(200).json({
            succsess:true,
            massage:'category data found',
            data:category
        })

    } catch (error) {
         res.status(500).json({
            succsess:false,
            message:"Internal server error"+error.message
        })
    }
}

const addCategory=async(req,res)=>{
  console.log(req.body);
  
    // try {

    //   const files=await foldername(req.file.path,"category")
    //   console.log(files);
    //     const category=await Categories.create({
    //       ...req.body,
    //       photo:{
    //         public_id:files.public_id,
    //         url:files.url
    //       }
    //     })

    //     if(!category){
    //       res.status(400).json({
    //        succsess:false,
    //        message:"category not created"
    //        })
    //     }
    //     res.status(201).json({
    //         succsess:true,
    //         massage:'category created',
    //         data:category
    //         })
    //   } catch (error) {
    //     res.status(500).json({
    //       success: false,
    //       message: 'Internal server error' + error.message,
    //     });
    //   }
}

const updateCategory= async(req,res)=>{
   try {
      const category=await Categories.findByIdAndUpdate(req.params.category_id,req.body,{new:true,runValidators:true})

      if(!category){
        res.status(400).json({
         succsess:false,
         message:"category not created"
         })
      }



      res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data:category
      })

   } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error' + error.message,
    });
   }
}

const deleteCategory=async(req,res)=>{
    try {
    
        const categoryToDelete = await Categories.findById(req.params.category_id);
    
        if (!categoryToDelete) {
          res.status(404).json({
            success: false,
            message: 'No category found',
          });
        }
       
       const data= await Categories.findByIdAndDelete(req.params.category_id);
    
        res.status(200).json({
          success: true,
          message: 'Category deleted successfully',
          data:data
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Internal server error' + error.message,
        });
      }
}

const countsubcategory = async (req, res) => {
  try {
    const categorySubcategoryCount = await Categories.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "category_id",
          as: "subcategories"
        }
      },
      {
        $unwind: {
          path: "$subcategories",
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $group: {
          _id: "$_id",
          main_category_name: { $first: "$name" },
          subcategories_count: { $sum: 1 }
        }
      }
    ]);

    if (!categorySubcategoryCount || categorySubcategoryCount.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories or subcategories found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subcategories count retrieved successfully',
      data: categorySubcategoryCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

const countActivecategory=async (req,res)=>{
  try {
    const categoryCount = await Categories.aggregate([
      {
        $match: {
          isActive:true
        }
      },
      {
        $count: 'totalIsActiveUsers'
      }
    ]);

    if (!categoryCount || categoryCount.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories isActive found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'isActive count retrieved successfully',
      data: categoryCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

const mostproduct=async(req,res)=>{
  try {
    const highsestproduct = await Categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",	
          foreignField: "category_id",
          as: "products"
        }
      },
      {
        $unwind: {
          path: "$products"
        }
      },
      {
        $group: {
          _id: "$_id",
          totalproduct:{$sum:1}
        }
      },
      {
        $sort: {
          totalproduct: -1
        }
      },
      {
        $limit: 1
      }
    ]);

    if (!highsestproduct || highsestproduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No product found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'highest product  successfully',
      data: highsestproduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

const totalproduct=async(req,res)=>{
  try {
    const totalproduct = await Categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",	
          foreignField: "category_id",
          as: "products"
        }
      },
      {
        $unwind: {
          path: "$products"
        }
      },
      {
        $group: {
          _id: "$_id",
          totalproduct:{
            $sum:1
          }
        }
      }
    ]);

    if (!totalproduct || totalproduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No product found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'total product  successfully',
      data: totalproduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

const listnonActivecategory=async(req,res)=>{
  try {
    const categoryCount = await Categories.aggregate([
      {
        $match: {
          isActive:false
        }
      }
    ]);

    if (!categoryCount || categoryCount.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories isnonActive found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'isActive  retrieved successfully',
      data: categoryCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

module.exports={
    listCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getcategory,
    countsubcategory,
    countActivecategory,
    mostproduct,
    totalproduct,
    listnonActivecategory
}