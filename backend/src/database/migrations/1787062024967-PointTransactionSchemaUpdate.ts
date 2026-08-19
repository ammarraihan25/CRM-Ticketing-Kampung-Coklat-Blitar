import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointTransactionSchemaUpdate1787062024967
  implements MigrationInterface
{
  name = 'PointTransactionSchemaUpdate1787062024967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."point_transactions_trx_type_enum" RENAME VALUE 'BURN' TO 'REDEEM'`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_transactions" ADD "pos_trx_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_transactions" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_transactions" ADD CONSTRAINT "FK_point_transactions_pos_trx_id" FOREIGN KEY ("pos_trx_id") REFERENCES "pos_transactions"("pos_trx_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "point_transactions" DROP CONSTRAINT "FK_point_transactions_pos_trx_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_transactions" ADD "description" character varying(255) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "point_transactions" DROP COLUMN "pos_trx_id"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."point_transactions_trx_type_enum" RENAME VALUE 'REDEEM' TO 'BURN'`,
    );
  }
}
