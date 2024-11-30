import { Router } from "express";
import { UserServices } from "../services/userServices";
import { ArticleServices } from "../services/articleServices";
import { UserController } from "../controller/userConstroller";
import { ArticleController } from "../controller/articleConstroller";
import { userAuth } from "../middlewares/userAuth";

const userRouter = Router()

const userService = new UserServices()
const articleServices = new ArticleServices()

const userController = new UserController(userService)
const articleController = new ArticleController(articleServices)

userRouter.route('/user')
    .post(userController.createUser.bind(userController))
    .get(userAuth,userController.getUser.bind(userController))

userRouter.post('/login', userController.loginUser.bind(userController))


userRouter.route('/article')
    .post(userAuth,articleController.createArticle.bind(articleController))
    .get(userAuth,articleController.getArticle.bind(articleController))
    .put(userAuth,articleController.updateArticle.bind(articleController))
    .delete(userAuth, articleController.deleteArtice.bind(articleController))
    
userRouter.get('/get-own-articles',userAuth,articleController.getArticleByPostedBy.bind(articleController)) 

userRouter.get('/get-all-articles',userAuth, articleController.getAllArticles.bind(articleController))

export default userRouter 

 