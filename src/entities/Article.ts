import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("articles")
class Article {
  @PrimaryColumn()
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
