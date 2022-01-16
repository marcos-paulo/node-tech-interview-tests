import { getCustomRepository } from "typeorm";
import { Cart } from "../entities/Cart";
import { Item } from "../entities/Item";
import { ItemsRepositories } from "../repositories/ItemsRepositories";

class AddItemService {
  async execute(carts: Cart[]) {
    const itemsRepositories = getCustomRepository(ItemsRepositories);

    let itemsArray = new Array<Item>();
    carts.map(({ id, items }) => {
      items.map(({ article_id, quantity }) => {
        const createItem = itemsRepositories.create({
          id: parseInt(`${id}${article_id}`),
          cart_id: id,
          article_id,
          quantity,
        });
        itemsArray.push(createItem);
      });
    });

    await itemsRepositories.save(itemsArray);
  }
}

export { AddItemService };
