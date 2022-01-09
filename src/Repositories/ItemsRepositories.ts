import { EntityRepository, Repository } from "typeorm";
import { Item } from "../entities/Item";

@EntityRepository(Item)
class ItemsRepositories extends Repository<Item> {}

export { ItemsRepositories };
