const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
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
                     commenterPicture: String,
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
                    post : {
                        type:[{
                            posterId: {
                                type : String,
                            },
                            posterfirstname : {
                                type : String, 
                            },
                            posterlastname : {
                                type : String, 
                            },
                            posterfullname: {
                                type : String, 
                            },
                            posterpicture : {
                                type : String, 
                            },
                            posterrole : {
                            type : String  
                            },
                            message: {
                                type: String
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
                            posterfollower:{
                                type : [String]
                            },
                            posterfollowing:{
                                type : [String]
                            },
                            likers: {
                                type: [String],
                            },
                            date : {
                                type: String
                            },
                        }]
                    }
                },
                {timestamps : true,}
                );

const CommentModel = mongoose.model('CommentUser',CommentSchema);
module.exports = CommentModel;
