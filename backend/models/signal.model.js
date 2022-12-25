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
                            commenterId: String,
                            commenterPseudo: String,
                            text: String,
                            timestamp: Number,
                        }
                    ],
                }
            }]
        }
    },
    {timestamps : true,}
);
const SignalModel = mongoose.model("signal", SignalSchema);
module.exports = SignalModel ;