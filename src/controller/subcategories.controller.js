
const Subcategories = require("../model/subcategories.model");

const listsubCategories=async(req,res)=>{
    console.log("data found");
    try {
        const subcategories=await Subcategories.find()
        console.log(subcategories);
        
        

        if(!subcategories || subcategories.length===0){
           return res.status(404).json({
                succsess:false,
                message:"No Subcategories found"
            })
        }

        res.status(200).json({
            succsess:true,
            massage:'subcategory data found',
            data:subcategories
        })
    } catch (error) {
      return res.status(500).json({
            succsess:false,
            message:"Internal server error"+error.message
        })
    }
}

const getsubcategory= async(req,res)=>{
    try {
        const subcategory=await Subcategories.findById(req.params.subcategory_id)
        console.log(subcategory,req.params.subcategory_id);

        if(!subcategory){
            res.status(404).json({
                succsess:false,
                message:"No subcategory found"
                })
        }
        res.status(200).json({
            succsess:true,
            massage:'subcategory data found',
            data:subcategory
        })

    } catch (error) {
         res.status(500).json({
            succsess:false,
            message:"Internal server error"+error.message
        })
    }
}

const addsubCategory=async(req,res)=>{
    try {
      console.log(req.body);
        const subcategory=await Subcategories.create(req.body)
    
        if(!subcategory){
          res.status(400).json({
           succsess:false,
           message:"subcategory not created"
           })
        }
        res.status(201).json({
            succsess:true,
            massage:'subcategory created',
            data:subcategory
            })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Internal server error' + error.message,
        });
      }
}

const updatesubCategory= async(req,res)=>{

   try {
    console.log(req.params.subcategory_id);
    console.log(req.body);
      const subcategory=await Subcategories.findByIdAndUpdate(req.params.subcategory_id,req.body,{new:true,runValidators:true})

      if(!subcategory){
        res.status(400).json({
         succsess:false,
         message:"subcategory not created"
         })
      }



      res.status(200).json({
        success: true,
        message: 'subcategory deleted successfully',
        data:category
      })

   } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error' + error.message,
    });
   }
}

const deletesubCategory=async(req,res)=>{
    try {
    
        const subcategoryToDelete = await Subcategories.findById(req.params.subcategory_id);
    
        if (!subcategoryToDelete) {
          res.status(404).json({
            success: false,
            message: 'No category found',
          });
        }
       
       const data= await Subcategories.findByIdAndDelete(req.params.subcategory_id);
    
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

const countSubcategory=async(req,res)=>{
  try {
    const categorySubcategoryCount = await Subcategories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "SubCategory_id",
          as: "products"
        }
      },
      {
        $unwind: {
          path: "$products",
        }
      },
      {
        $group: {
            _id: "$_id",
           subcategory_name: { $first: "$name" },
          products_count: { $sum: 1 },
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
}



module.exports={
    listsubCategories,
    getsubcategory,
    addsubCategory,
    updatesubCategory,
    deletesubCategory,
    countSubcategory
}