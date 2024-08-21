

const cloudinary=require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: "dbgxwrrku", 
    api_key:process.env.CLOUDINERY_API_KEY, 
    api_secret:process.env.CLOUDINERY_API_SECRET 
});

const foldername=async(localpath,filename)=>{
    try {
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            folder: filename
        }).catch((error)=>{console.log(error)});

        return uploadResult
    } catch (error) {
        console.log(error.massage);
    }
}

module.exports=foldername