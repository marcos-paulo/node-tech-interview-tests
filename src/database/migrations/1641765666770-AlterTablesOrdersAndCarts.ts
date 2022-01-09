import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AlterTablesOrdersAndCarts1641765666770
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "carts",
      new TableColumn({
        name: "delivery_value",
        type: "double",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "delivery_value",
        type: "double",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("carts", "delivery_value");
    await queryRunner.dropColumn("orders", "delivery_value");
  }
}
