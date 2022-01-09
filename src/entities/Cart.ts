import { Item } from "./Item";
import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("carts")
class Cart {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Exclude()
  @CreateDateColumn()
  created_at?: Date;

  @Exclude()
  @CreateDateColumn()
  delivery_value?: number;

  @Expose({ name: "total" })
  sumTotal?() {
    let total = 0;
    this.items.map((item) => {
      total += item.article!.price * item.quantity;
    });
    return total;
  }

  @Exclude()
  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];

  constructor(id: number) {
    if (!this.id) {
      this.id = id;
    }
  }
}

export { Cart };
