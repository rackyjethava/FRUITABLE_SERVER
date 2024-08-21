const mongoose = require("mongoose");

const itemsSchema=mongoose.Schema(
    {
       Product_id:{
        type: mongoose.Types.ObjectId,
        ref: "Products"
       },
       quantity:{
        type:Number,
        required:true
       }
    }
)
const cartsSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Types.ObjectId,
            ref: 'User'

        },
        items:[itemsSchema],
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
)

const Carts = mongoose.model("Carts", cartsSchema);

module.exports = Carts;