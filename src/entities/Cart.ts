import { Item } from "./Item";
import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("carts")
class Cart {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Exclude()
  @CreateDateColumn()
  created_at?: Date;

  @Exclude()
  @Column()
  delivery_fee?: number;

  @Expose({ name: "total" })
  sumTotal?() {
    let total = 0;
    this.items.map((item) => {
      total += item.article!.price * item.quantity;
    });
    total += this.delivery_fee!;
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
