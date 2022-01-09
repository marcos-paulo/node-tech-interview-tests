import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItems1641516388364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "cart_id",
            type: "int",
          },
          {
            name: "article_id",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            name: "FKCartsItens",
            columnNames: ["cart_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "carts",
            onDelete: "CASCADE",
          },
          {
            name: "FKArticleItens",
            columnNames: ["article_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "articles",
            onDelete: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  }
}
