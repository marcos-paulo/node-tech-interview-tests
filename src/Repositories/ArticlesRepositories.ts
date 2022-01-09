import { EntityRepository, Repository } from "typeorm";
import { Article } from "../entities/Article";

@EntityRepository(Article)
class ArticlesRepositories extends Repository<Article> {}

export { ArticlesRepositories };
