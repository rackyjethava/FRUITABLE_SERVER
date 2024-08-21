const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        profile:{
            type: String,
        },
        refreshToken: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        googleId:{
            type: String
        },
        facebookId:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
