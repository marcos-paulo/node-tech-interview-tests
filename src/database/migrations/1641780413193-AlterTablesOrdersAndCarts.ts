import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableOrdersAndCarts1641780413193
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "carts",
      new TableColumn({
        name: "discount",
        type: "double",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "carts",
      new TableColumn({
        name: "total",
        type: "double",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "discount",
        type: "double",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "total",
        type: "double",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("carts", "discount");
    await queryRunner.dropColumn("carts", "total");
    await queryRunner.dropColumn("orders", "discount");
    await queryRunner.dropColumn("orders", "total");
  }
}
