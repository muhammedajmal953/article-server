import { Request, Response } from "express";
import { ArticleServices } from "../services/articleServices";

export class ArticleController {
  constructor(private _arcticleService: ArticleServices) { }

  async createArticle(req: Request, res: Response): Promise<any> {
    try {
      const formData = req.body;
      console.log(req.body);

      if (!formData) {
        return res.status(400).json({ message: "Bad request" });
      }

      formData.postedBy = req.userId

      const result = await this._arcticleService.createArticle(formData);

      if (!result.success) {
        return res.status(401).json({ message: "Bad Gateway" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.log("Error from articleController.createArticle", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async updateArticle(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.query;
      const formData = req.body;

      console.log('userId from the edit content', req.userId);


      if (!id || !formData) {
        return res.status(400).json({ message: "Bad Request" });
      }

      const result = await this._arcticleService.updateArticle(
        id as string,
        formData
      );

      if (!result.success) {
        return res.status(401).json({ message: "Bad Gateway" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.log("Error from articleController.updateArticle", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async getArticle(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.query;


      if (!id) {
        return res.status(400).json({ message: "Invalid or missing 'id' parameter" });
      }
      const result = await this._arcticleService.getArticle(id as string)

      if (!result.success) {
        return res.status(404).json({ message: "article not found" });
      }

      return res.status(200).json(result);

    } catch (error) {
      console.log("Error from articleController.getArticle", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async getAllArticles(req: Request, res: Response): Promise<any> {
    try {
      const result = await this._arcticleService.getAllArticles()

      if (!result.success) {
        return res.status(404).json({ message: "articles not found" });
      }

      return res.status(200).json(result);

    } catch (error) {
      console.log("Error from articleController.getAllArticles", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async deleteArtice(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.query;


      if (!id) {
        return res.status(400).json({ message: "Invalid or missing 'id' parameter" });
      }
      const result = await this._arcticleService.deleteArticle(id as string)

      if (!result?.success) {
        return res.status(404).json({ message: "article not found" });
      }

      return res.status(200).json(result);

    } catch (error) {
      console.log("Error from articleController.getArticle", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async getArticleByPostedBy(req: Request, res: Response): Promise<any> {
    try {
      const result = await this._arcticleService.getOwnArticles(req.userId)

      if (!result.success) {
        return res.status(404).json({ message: "articles not found" });
      }

      return res.status(200).json(result);

    } catch (error) {
      console.log("Error from articleController.getAllArticles", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
