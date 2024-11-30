import { triggerAsyncId } from "async_hooks";
import { IArticle } from "../Interfaces/IArticles";
import { Article } from "../models/aticleModel";
import mongoose from "mongoose";


export class ArticleServices{
    constructor() { }
    
    async createArticle(data: IArticle) {
        try {
            const newArticle =new Article(data)
            await newArticle.save()

            return {
                success: true,
                message: 'Article created Success fully',
                data:newArticle
            }
        } catch (error) {
            console.log("Error from ArticleService.createArticle", error);
            return {
                message: "something went wrong",
            };
        }
    }

    async updateArticle(id:string,updations:Partial<IArticle>) {
        try {
            const updatedArticle = await Article.findByIdAndUpdate(id, { $set: updations })
            if (!updatedArticle) {
                return {
                    message:'Bad Request'
                }
            }
            return {
                success: true,
                message: 'Updated Success fully',
                data:updatedArticle
            }
        } catch (error) {
            console.log("Error from ArticleService.updateArticle", error);
            return {
                message: "something went wrong",
            }; 
        }
    }

    async deleteArticle(id:string) {
        try {
            await Article.findByIdAndDelete(id)  
            return {
                success: true,
                message:'Deleted Succefully'
            }
        } catch (error) {
            console.log("Error from ArticleService.DeleteArticle", error);
            return {
                message: "something went wrong",
            };
        }
    }

   async getArticle(id:string) {
        try {
            const article = await Article.findById(id)
            
            return {
                success: true,
                message: 'Article fetched Seccussfully',
                data:article
            }
        } catch (error) {
            console.log("Error from ArticleService.getArticle", error);
            return {
                message: "something went wrong",
            };
        }
    }
   async getAllArticles(id:string='') {
       try {
                
               const articles = await Article.find()
          

            return {
                success: true,
                message: 'Article fetched Seccussfully',
                data:articles
            }
        } catch (error) {
            console.log("Error from ArticleService.getAllArticle", error);
            return {
                message: "something went wrong",
            };
        }
    }

    async getOwnArticles(id:string) {
        try {
                
            const articles = await Article.find({postedBy:new mongoose.Types.ObjectId(id)})
       

         return {
             success: true,
             message: 'Article fetched Seccussfully',
             data:articles
         }
     } catch (error) {
         console.log("Error from ArticleService.getAllArticle", error);
         return {
             message: "something went wrong",
         };
     }
    }

}