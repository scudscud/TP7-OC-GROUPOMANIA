const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type : String,
            required: true
        },
        posterfirstname : {
            type : String, 
            required: true,
        },
        posterlastname : {
            type : String, 
            required: true,
        },
        posterfullname: {
            type : String, 
            required: true,

        },
        posterpicture : {
            type : String, 
            // required: true,
        },
        posterrole : {
        type : String  
        },
        message: {
            type: String,
            trim: true,
            maxlenght: 500,
        },
        picture: {
            type: String,
        },
        video: {
            type:String,
        },
        signal:{
            type : Boolean
        },
        posterfollower:{
           type : [String]
        },
        posterfollowing:{
            type : [String]
        },

        signalBy:{
            type: [String]
        },
        likers: {
            type: [String],
            required: true,
        },
        date : {
            type: String
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model('post',PostSchema);