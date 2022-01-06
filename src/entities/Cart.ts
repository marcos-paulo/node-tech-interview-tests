import { Item } from "./Item";

class Cart {
  id: number;
  items: Item[];
  total: number;
  constructor(id: number, items: Item[]) {
    this.id = id;
    this.items = items;
    this.total = 0;
  }
}

export { Cart };
