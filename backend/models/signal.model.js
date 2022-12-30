const mongoose = require('mongoose');
const SignalSchema = new mongoose.Schema(
    {
        signalByFullname : {
            type : String,
            required: true
        },
        signalById :{
            type : String,
            required: true
         },
        signalUserFullname: {
            type : String,
            required: true
        },
        signalUserId:{
            type : String,
            required: true
        },
        signalPostId : {
            type : String,
            required: true
        },
        date: {
            type : String,
            required: true
        },
        post :{
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
                             commentPicture: String,
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
                }
            }
        ]
        }
    },
    {timestamps : true,}
);
const SignalModel = mongoose.model("signal", SignalSchema);
module.exports = SignalModel ;