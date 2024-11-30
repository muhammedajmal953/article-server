

export interface IArticle extends Document{
    heading: string,
    content: string,
    image: string,
    postedBy: any,
    createdAt: Date,
}