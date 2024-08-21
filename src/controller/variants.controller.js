const Variants=require("../model/variants.model");
const foldername = require("../utils/cloudinary");

const listVariants = async (req, res) => {
    try {
        const variants = await Variants.find();
        console.log(variants);

        if (!variants || variants.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Variants not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Variants fetched successfully.',
            data: variants
        });
    } catch (error) {
        console.error("Error fetching variants:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id);
        console.log(variant);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Variant fetched successfully.',
            data: variant
        });
    } catch (error) {
        console.error("Error fetching variant:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const addVariant = async (req, res) => {
    console.log("Body:", req.body);
    console.log("Files:", req.files); 

    if (!req.files || req.files.length === 0) {
        console.error("No files received");
        return res.status(400).json({
            success: false,
            message: 'Variant images are required.'
        });
    }

    try {
        const uploadedImages = await Promise.all(req.files.map(async (file) => {
            const uploadedImage = await foldername(file.path, "variantImg");
            console.log("Uploaded Image:", uploadedImage);
            return {
                public_id: uploadedImage.public_id,
                url: uploadedImage.url
            };
        }));

   
        const variantData = {
            ...req.body,
            variantImg: uploadedImages  
        };

        const variant = await Variants.create(variantData);
        console.log("Created Variant:", variant);

        res.status(201).json({
            success: true,
            message: 'Variant created successfully.',
            data: variant
        });

    } catch (error) {
        console.error("Error creating variant:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

    

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);

        if (!variant) {
            return res.status(400).json({
                success: false,
                message: 'Variant not deleted.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Variant deleted successfully.',
            data: variant
        });
    } catch (error) {
        console.error("Error deleting variant:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

const updateVariant = async (req, res) => {
    try {
        const variantId = req.params.variant_id;
        console.log("Updating Variant ID:", variantId);

        const updatedData = { ...req.body };
        console.log("Updated Data:", updatedData);

        const variant = await Variants.findByIdAndUpdate(
            variantId,
            { $set: updatedData }, 
            { new: true, runValidators: true }
        );
        console.log("Updated Variant:", variant);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: 'Variant not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Variant updated successfully.',
            data: variant
        });
    } catch (error) {
        console.error("Error updating variant:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
};

module.exports = {
    listVariants,
    getVariant,
    addVariant,
    deleteVariant,
    updateVariant
};
