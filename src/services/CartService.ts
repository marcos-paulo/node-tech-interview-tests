import { getCustomRepository } from "typeorm";
import { Cart } from "../entities/Cart";
import { Item } from "../entities/Item";
import { CartsRepositories } from "../repositories/CartsRepositories";
import { ItemsRepositories } from "../repositories/ItemsRepositories";

class AddCartService {
  async execute(carts: Cart[]) {
    if (!carts) throw new Error("Carts - not informed!");

    const cartsRepositories = getCustomRepository(CartsRepositories);
    let cartsArray = new Array<Cart>();

    carts.map(({ id }) => {
      const createCart = cartsRepositories.create({ id });
      cartsArray.push(createCart);
    });

    await cartsRepositories.save(cartsArray);
  }
}

export { AddCartService };
