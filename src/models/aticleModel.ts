import mongoose, { Schema } from "mongoose";
import { IArticle } from "../Interfaces/IArticles";
import { ObjectId } from "mongodb";




const article =new Schema<IArticle>({
    heading: {
        type: String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    postedBy: {
        type:ObjectId,
        ref:'users'
    },
    createdAt: {
        type: Date,
        default:new Date()
    }
})

export const Article=mongoose.model('Article',article)