import { Exclude, Expose } from "class-transformer";
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

  @Exclude()
  @Column()
  delivery_fee?: number;

  @Exclude()
  @Column()
  discount?: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  total?: number;

  sumTotal?() {
    this.total = 0;
    this.items.map((item) => {
      this.total! += item.article!.price * item.quantity;
    });
    this.total! = this.total! + this.delivery_fee! - this.discount!;
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
