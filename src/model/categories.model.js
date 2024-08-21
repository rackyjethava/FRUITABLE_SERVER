const mongoose=require("mongoose")

const catagoriesSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        description:{
            type:String,
            required:true,
            lowercase:true,
            trim:true

        },
        photo:{
            type:{
                public_id:String,
                url:String
            }
        },
        isActive:{
            type:Boolean,
            required: true,
            default:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Categories=mongoose.model("Categories",catagoriesSchema);

module.exports=Categories;