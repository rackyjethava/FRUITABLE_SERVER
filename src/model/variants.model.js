const mongoose = require("mongoose");


const variantsSchema = new mongoose.Schema(
    {
        SubCategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "Subcategories",
            required: true
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Categories",
            required: true
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        attributes: {
            type:Object,
            of:String,
            required:true
        },
        variantImg:[
           {
            public_id:{
                type:String
            },
            url:{
                type:String
            },
           }
        ],

        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model("Variants", variantsSchema);

module.exports = Variants;