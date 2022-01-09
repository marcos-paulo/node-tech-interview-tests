import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
class Article {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  constructor(id: number) {
    if (!this.id) {
      this.id = id;
    }
  }
}

export { Article };
