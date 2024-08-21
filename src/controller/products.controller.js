const Products = require("../model/product.model");
const foldername = require("../utils/cloudinary");

const listProducts = async (req, res) => {
    console.log("dfhiued");
    try {
        const product = await Products.find();
        console.log(product);

        if (!product || product.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Products not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Products fetch successfully.',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const getProduct = async (req, res) => {

    try {
        const product = await Products.findById(req.params.product_id)
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'product not found.'
            })
        }
        res.status(200).json({
            success: true,
            message: 'product fetch successfully.',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}


const addProduct = async (req, res) => {
    console.log("File:", req.file);
    console.log("Body:", req.body);

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Product image is required.'
            });
        }


        const productImage = await foldername(req.file.path, "product");
        console.log("Product Image Upload Response:", productImage);


        const product = await Products.create({
            ...req.body,
            image: {
                public_id: productImage.public_id,
                url: productImage.url
            }
        });
        console.log("Created Product:", product);

        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            data: product
        });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. ' + error.message
        });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.product_id)

        if (!product) {
            res.status(400).json({
                success: false,
                message: 'product not deleted.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'product deleted successfully.',
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error.' + error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {

        const productId = req.params.product_id;
        console.log("Updating Product ID:", productId);

        let updatedData = { ...req.body };
        console.log(updatedData);


        if (req.file) {
            const productImage = await foldername(req.file.path, "product");
            console.log("New Product Image Upload Response:", productImage);


            updatedData.image = {
                public_id: productImage.public_id,
                url: productImage.url
            };

        }

        const product = await Products.findByIdAndUpdate(
            productId,
            { $set: updatedData }, 
            { new: true, runValidators: true }
        );

        console.log("Updated Product:", product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            data: product
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. ' + error.message
        });
    }
};

const countproduct=async(req,res)=>{
    try {
        const categorySubcategoryCount = await Products.aggregate([
            {
              $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "catgories"
              }
            },
            {
              $unwind: {
                path: "$catgories",
              }
            },
            {
              $group: {
                _id: "$category_id",
               category_name:{$first:"$catgories.name"},
                product_count:{
                  $sum:1
                }
              }
            }
          ]);
    
        if (!categorySubcategoryCount || categorySubcategoryCount.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No categories or products found"
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'products count retrieved successfully',
          data: categorySubcategoryCount
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Internal server error: ' + error.message
        });
      }
}


const serchProduct=async(req,res)=>{
    try {
        const {category, avgrating, min, max, page, limit}=req.body

        const mergeline={
            
        }

        if(category){
            mergeline["category_id"]=category

        }

        if(avgrating){
            mergeline["avgrating"]={$gte:avgrating}
        }
        if(min != undefined || max !=undefined){
            mergeline["variant.attributes.Price"]= {}

        }
        if(min != undefined){
            mergeline["variant.attributes.Price"]["$gte"]=max

        }

        if(max != undefined){
            mergeline["variant.attributes.Price"]["$lte"]=min

        }

        console.log(mergeline);
        

        const pipeline=[
            {
              $lookup: {
                from: 'variants',
                localField: '_id',
                foreignField: 'product_id',
                as: 'variant'
              }
            },
            {
              $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product_id',
                as: 'review'
              }
            },
            {
              $addFields: {
                avgrating:'$review.rating'
              }
            },
            {
              $unwind: {
                path: '$variant',
                
              }
            },
            {
              $match: mergeline
            },
            {
              $group: {
                _id: '$_id',
                name:{$first:'$name'},
               variant:{$push:"$variant"},
                review:{$push:"$review"}
                }
            },
            {
              $sort: {
                name:1
              }
            },
            {
              $skip: 0
            },
            {
              $limit: 10
            }
          ]
        
          const data=await Products.aggregate(pipeline)

          console.log(data);
          
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    listProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    countproduct,
    serchProduct
}

