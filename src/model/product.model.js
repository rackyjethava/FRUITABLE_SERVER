const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    {
        SubCategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "Subcategories",
            required: true
        },
        category_id:{
            type:mongoose.Types.ObjectId,
            ref:"Categories",
            required:true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        price:{
            type:Number,
            required: true,
            trim: true
        },
        image: {
            type:{
                public_id:String,
                url:String
            }
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
    
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
