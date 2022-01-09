import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ default: false })
  isFinished: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "total" })
  sumTotal() {
    let total = 0;
    this.items.map((item) => {
      total += item.article!.price * item.quantity;
    });
    return total;
  }

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  constructor(id: number) {
    if (!this.id) {
      this.id = id;
    }
  }
}

export { Order };
