import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Cart } from "./Cart";

@Entity("items")
class Item {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Exclude()
  @Column()
  cart_id: number;

  @Column()
  article_id: number;

  @Column()
  quantity: number;

  @JoinColumn({ name: "cart_id" })
  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @JoinColumn({ name: "article_id" })
  @OneToOne(() => Article)
  article: Article;
}

export { Item };
