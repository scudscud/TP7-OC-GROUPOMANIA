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
        signalBy :{
            type:[String],
        },
        signalpost:{
            type : [{
                signalByFullname : String,
                signalById : String,
                signalUserFullname: String,
                signalUserId: String,
                signalPostId : String,
                date: String,
            }]
        },
        posterfollower:{
           type : [String]
        },
        posterfollowing:{
            type : [String]
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
                    postCommentId: {
                       type: String,
                       required : true
                    },
                    commenterId: {
                       type: String,
                       required : true
                    },
                    commenterFirstname:{
                        type: String,
                        required : true
                     },
                    commenterLastname:{
                        type: String,
                        required : true
                     },
                    commenterFullname: {
                        type: String,
                        required : true
                     },
                     commenterPicture: {
                       type: String
                    },
                     comment: {
                     type: String,
                     trim: true,
                     maxlenght: 200,
                     required : true
                     },
                    commentLikers:{ 
                       type: [String]
                    },
                    commentDate : {
                        type: String
                    },
                    
                }
            ],
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model('post',PostSchema);