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

  @Exclude()
  @Column()
  discount?: number;

  @Exclude()
  @Column()
  total?: number;

  @Expose({ name: "total" })
  private sumTotal?() {
    // console.log(`${this.total!}`);
    // console.log(`${this.discount!}`);
    // console.log(`${this.delivery_fee!}`);
    return this.total! - this.discount! + this.delivery_fee!;
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
