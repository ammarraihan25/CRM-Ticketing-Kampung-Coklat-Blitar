import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1787112271426 implements MigrationInterface {
    name = 'SchemaUpdate1787112271426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vouchers_voucher_type_enum" AS ENUM('DISCOUNT', 'FREE_TICKET')`);
        await queryRunner.query(`CREATE TYPE "public"."vouchers_status_claim_enum" AS ENUM('ISSUED', 'CLAIMED', 'EXPIRED')`);
        await queryRunner.query(`CREATE TABLE "vouchers" ("voucher_code" character varying(50) NOT NULL, "nomor_whatsapp" character varying(20) NOT NULL, "voucher_type" "public"."vouchers_voucher_type_enum" NOT NULL, "benefit_value" numeric(10,2) NOT NULL, "status_claim" "public"."vouchers_status_claim_enum" NOT NULL DEFAULT 'ISSUED', "expiry_date" date NOT NULL, CONSTRAINT "PK_1445a42f62127bf6cde38b4de47" PRIMARY KEY ("voucher_code"))`);
        await queryRunner.query(`ALTER TABLE "vouchers" ADD CONSTRAINT "FK_2339712dc385cce4b432e8bff1f" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" DROP CONSTRAINT "FK_2339712dc385cce4b432e8bff1f"`);
        await queryRunner.query(`DROP TABLE "vouchers"`);
        await queryRunner.query(`DROP TYPE "public"."vouchers_status_claim_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vouchers_voucher_type_enum"`);
    }

}
