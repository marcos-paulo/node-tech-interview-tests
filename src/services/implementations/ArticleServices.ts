import { getCustomRepository } from "typeorm";
import { Article } from "../entities/Article";
import { ArticlesRepositories } from "../repositories/ArticlesRepositories";

class AddArticleService {
  async execute(articles: Article[]) {
    const articlesRepositories = getCustomRepository(ArticlesRepositories);

    if (!articles) throw new Error("Articles - not informed!");

    let articlesArray = new Array<Article>();
    articles.map(({ id, name, price }) => {
      const createArticle = articlesRepositories.create({
        id,
        name,
        price,
      });
      articlesArray.push(createArticle);
    });
    await articlesRepositories.save(articlesArray);
  }
}

export { AddArticleService };
