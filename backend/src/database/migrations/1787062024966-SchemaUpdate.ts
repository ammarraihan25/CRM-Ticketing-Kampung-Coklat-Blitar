import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1787062024966 implements MigrationInterface {
    name = 'SchemaUpdate1787062024966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."members_tipe_member_enum" AS ENUM('PR', 'PP', 'PT')`);
        await queryRunner.query(`CREATE TYPE "public"."members_tier_enum" AS ENUM('Bronze', 'Silver', 'Gold')`);
        await queryRunner.query(`CREATE TABLE "members" ("nomor_whatsapp" character varying(20) NOT NULL, "nama_lengkap" character varying(100) NOT NULL, "domisili" character varying(100), "tipe_member" "public"."members_tipe_member_enum" NOT NULL DEFAULT 'PR', "current_points" integer NOT NULL DEFAULT '0', "total_spend" numeric(12,2) NOT NULL DEFAULT '0', "tier" "public"."members_tier_enum" NOT NULL DEFAULT 'Bronze', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c244a7546fb16b2545488681e67" PRIMARY KEY ("nomor_whatsapp"))`);
        await queryRunner.query(`CREATE TYPE "public"."point_transactions_trx_type_enum" AS ENUM('EARN', 'BURN')`);
        await queryRunner.query(`CREATE TABLE "point_transactions" ("trx_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomor_whatsapp" character varying(20) NOT NULL, "trx_type" "public"."point_transactions_trx_type_enum" NOT NULL, "points_amount" integer NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ecf353b44c0abe799689a0da371" PRIMARY KEY ("trx_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pos_transactions_payment_method_enum" AS ENUM('CASH', 'QRIS', 'DEBIT', 'TRANSFER')`);
        await queryRunner.query(`CREATE TYPE "public"."pos_transactions_payment_status_enum" AS ENUM('PAID', 'REFUNDED', 'VOID')`);
        await queryRunner.query(`CREATE TABLE "pos_transactions" ("pos_trx_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomor_whatsapp" character varying(20) NOT NULL, "cashier_id" character varying(50) NOT NULL, "total_amount" numeric(12,2) NOT NULL, "payment_method" "public"."pos_transactions_payment_method_enum" NOT NULL, "payment_status" "public"."pos_transactions_payment_status_enum" NOT NULL DEFAULT 'PAID', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_00a611ffdb42c9bc12c59fd72dc" PRIMARY KEY ("pos_trx_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_tiket_enum" AS ENUM('ACTIVE', 'USED', 'EXPIRED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("ticket_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomor_whatsapp" character varying(20) NOT NULL, "ticket_code" character varying(50) NOT NULL, "paket_id" character varying(20) NOT NULL, "status_tiket" "public"."tickets_status_tiket_enum" NOT NULL DEFAULT 'ACTIVE', "valid_until" TIMESTAMP NOT NULL, CONSTRAINT "UQ_40e7b62bf74bc61a7d74d682936" UNIQUE ("ticket_code"), CONSTRAINT "PK_8de0cebd669ff84059e9976e17d" PRIMARY KEY ("ticket_id"))`);
        await queryRunner.query(`ALTER TABLE "point_transactions" ADD CONSTRAINT "FK_27263cb2ca441dd8ecee0d5692c" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pos_transactions" ADD CONSTRAINT "FK_69a9c35cbe27a3312d3b1d572f8" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_107b9f758fa17b6bb867b082f85" FOREIGN KEY ("nomor_whatsapp") REFERENCES "members"("nomor_whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_107b9f758fa17b6bb867b082f85"`);
        await queryRunner.query(`ALTER TABLE "pos_transactions" DROP CONSTRAINT "FK_69a9c35cbe27a3312d3b1d572f8"`);
        await queryRunner.query(`ALTER TABLE "point_transactions" DROP CONSTRAINT "FK_27263cb2ca441dd8ecee0d5692c"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_tiket_enum"`);
        await queryRunner.query(`DROP TABLE "pos_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."pos_transactions_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pos_transactions_payment_method_enum"`);
        await queryRunner.query(`DROP TABLE "point_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."point_transactions_trx_type_enum"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TYPE "public"."members_tier_enum"`);
        await queryRunner.query(`DROP TYPE "public"."members_tipe_member_enum"`);
    }

}
