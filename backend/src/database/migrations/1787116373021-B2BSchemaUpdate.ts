import { MigrationInterface, QueryRunner } from "typeorm";

export class B2BSchemaUpdate1787116373021 implements MigrationInterface {
    name = 'B2BSchemaUpdate1787116373021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('PENDING', 'DP_PAID', 'FULLY_PAID', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomor_whatsapp" character varying(20) NOT NULL, "visit_date" date NOT NULL, "total_pax" integer NOT NULL, "total_amount" numeric(12,2) NOT NULL, "dp_amount" numeric(12,2) NOT NULL DEFAULT '0', "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ff0b5d1ab3fea22169440436f2" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."agent_commissions_trx_type_enum" AS ENUM('CREDIT', 'DEBIT')`);
        await queryRunner.query(`CREATE TYPE "public"."agent_commissions_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "agent_commissions" ("trx_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomor_whatsapp" character varying(20) NOT NULL, "trx_type" "public"."agent_commissions_trx_type_enum" NOT NULL, "amount" numeric(12,2) NOT NULL, "status" "public"."agent_commissions_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a6241b16859794fb17c8c34dff" PRIMARY KEY ("trx_id"))`);
        await queryRunner.query(`CREATE TABLE "tier_pricings" ("tier_id" SERIAL NOT NULL, "min_pax" integer NOT NULL, "max_pax" integer, "price_per_ticket" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af6c4767221234b7961f8a1839e" PRIMARY KEY ("tier_id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bf809a3e6ff67046618ac4020c6" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_commissions" ADD CONSTRAINT "FK_ad01c2ac9791bccd980b01181ed" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent_commissions" DROP CONSTRAINT "FK_ad01c2ac9791bccd980b01181ed"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_bf809a3e6ff67046618ac4020c6"`);
        await queryRunner.query(`DROP TABLE "tier_pricings"`);
        await queryRunner.query(`DROP TABLE "agent_commissions"`);
        await queryRunner.query(`DROP TYPE "public"."agent_commissions_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."agent_commissions_trx_type_enum"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    }

}
