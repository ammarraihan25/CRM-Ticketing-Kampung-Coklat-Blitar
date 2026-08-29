import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1787796827933 implements MigrationInterface {
    name = 'SchemaUpdate1787796827933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "nama" character varying(100) NOT NULL, "whatsapp" character varying(20) NOT NULL, "domisili" character varying(100), "tipeMember" character varying NOT NULL DEFAULT 'PR', "status" character varying NOT NULL DEFAULT 'Aktif', "totalSpend" numeric(12,2) NOT NULL DEFAULT '0', "tanggalDaftar" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2bc95a6b386f358127ad9336459" UNIQUE ("whatsapp"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_commissions" ("trx_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "whatsapp" character varying(20) NOT NULL, "trx_type" character varying NOT NULL, "amount" numeric(12,2) NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a6241b16859794fb17c8c34dff" PRIMARY KEY ("trx_id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "whatsapp" character varying(20) NOT NULL, "visit_date" date NOT NULL, "total_pax" integer NOT NULL, "total_amount" numeric(12,2) NOT NULL, "dp_amount" numeric(12,2) NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ff0b5d1ab3fea22169440436f2" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`CREATE TABLE "pos_transactions" ("pos_trx_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "whatsapp" character varying(20) NOT NULL, "cashier_id" character varying(50) NOT NULL, "total_amount" numeric(12,2) NOT NULL, "payment_method" character varying NOT NULL, "payment_status" character varying NOT NULL DEFAULT 'PAID', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_00a611ffdb42c9bc12c59fd72dc" PRIMARY KEY ("pos_trx_id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("ticket_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "whatsapp" character varying(20) NOT NULL, "ticket_code" character varying(50) NOT NULL, "paket_id" character varying(20) NOT NULL, "status_tiket" character varying NOT NULL DEFAULT 'ACTIVE', "valid_until" TIMESTAMP NOT NULL, CONSTRAINT "UQ_40e7b62bf74bc61a7d74d682936" UNIQUE ("ticket_code"), CONSTRAINT "PK_8de0cebd669ff84059e9976e17d" PRIMARY KEY ("ticket_id"))`);
        await queryRunner.query(`CREATE TABLE "tier_pricings" ("tier_id" SERIAL NOT NULL, "min_pax" integer NOT NULL, "max_pax" integer, "discount_percentage" numeric(5,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af6c4767221234b7961f8a1839e" PRIMARY KEY ("tier_id"))`);
        await queryRunner.query(`CREATE TABLE "vouchers" ("voucher_code" character varying(50) NOT NULL, "whatsapp" character varying(20) NOT NULL, "voucher_type" character varying NOT NULL, "benefit_value" numeric(10,2) NOT NULL, "status_claim" character varying NOT NULL DEFAULT 'ISSUED', "expiry_date" date NOT NULL, CONSTRAINT "PK_1445a42f62127bf6cde38b4de47" PRIMARY KEY ("voucher_code"))`);
        await queryRunner.query(`CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "imageUrl" text, "price" integer NOT NULL DEFAULT '0', "isFreeTerusan" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL DEFAULT 'BUKA', "capacity" integer NOT NULL DEFAULT '1', "duration" character varying(50), "description" text, "playedToday" integer NOT NULL DEFAULT '0', "category" character varying NOT NULL DEFAULT 'terusan', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL DEFAULT 'gate', "name" character varying(100) NOT NULL, "imageUrl" text, "price" integer NOT NULL DEFAULT '0', "description" text, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30d7c891cfe1f87301022909931" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agent_commissions" ADD CONSTRAINT "FK_4775f8f1377f2b14933761156da" FOREIGN KEY ("whatsapp") REFERENCES "members"("whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_0cee4a09933de1195607facd36e" FOREIGN KEY ("whatsapp") REFERENCES "members"("whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pos_transactions" ADD CONSTRAINT "FK_c24da52f9e2a61b0b6c4c92f746" FOREIGN KEY ("whatsapp") REFERENCES "members"("whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_d774ab5570c07a0429498280a9c" FOREIGN KEY ("whatsapp") REFERENCES "members"("whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vouchers" ADD CONSTRAINT "FK_2ab02f153bd6ecf992a6b02e93e" FOREIGN KEY ("whatsapp") REFERENCES "members"("whatsapp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" DROP CONSTRAINT "FK_2ab02f153bd6ecf992a6b02e93e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_d774ab5570c07a0429498280a9c"`);
        await queryRunner.query(`ALTER TABLE "pos_transactions" DROP CONSTRAINT "FK_c24da52f9e2a61b0b6c4c92f746"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_0cee4a09933de1195607facd36e"`);
        await queryRunner.query(`ALTER TABLE "agent_commissions" DROP CONSTRAINT "FK_4775f8f1377f2b14933761156da"`);
        await queryRunner.query(`DROP TABLE "ticket_rates"`);
        await queryRunner.query(`DROP TABLE "rides"`);
        await queryRunner.query(`DROP TABLE "vouchers"`);
        await queryRunner.query(`DROP TABLE "tier_pricings"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "pos_transactions"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "agent_commissions"`);
        await queryRunner.query(`DROP TABLE "members"`);
    }

}
