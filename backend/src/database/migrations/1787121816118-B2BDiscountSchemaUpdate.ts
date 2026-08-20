import { MigrationInterface, QueryRunner } from "typeorm";

export class B2BDiscountSchemaUpdate1787121816118 implements MigrationInterface {
    name = 'B2BDiscountSchemaUpdate1787121816118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tier_pricings" RENAME COLUMN "price_per_ticket" TO "discount_percentage"`);
        await queryRunner.query(`ALTER TABLE "tier_pricings" ALTER COLUMN "discount_percentage" TYPE numeric(5,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tier_pricings" ALTER COLUMN "discount_percentage" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "tier_pricings" RENAME COLUMN "discount_percentage" TO "price_per_ticket"`);
    }

}
