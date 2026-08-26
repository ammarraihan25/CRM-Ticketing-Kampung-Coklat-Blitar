import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConfigTables1787713471409 implements MigrationInterface {
    name = 'CreateConfigTables1787713471409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rides_status_enum" AS ENUM('BUKA', 'MAINTENANCE', 'TUTUP')`);
        await queryRunner.query(`CREATE TYPE "public"."rides_category_enum" AS ENUM('terusan', 'paid', 'water')`);
        await queryRunner.query(`CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "imageUrl" text, "price" integer NOT NULL DEFAULT '0', "isFreeTerusan" boolean NOT NULL DEFAULT false, "status" "public"."rides_status_enum" NOT NULL DEFAULT 'BUKA', "capacity" integer NOT NULL DEFAULT '1', "duration" character varying(50), "description" text, "playedToday" integer NOT NULL DEFAULT '0', "category" "public"."rides_category_enum" NOT NULL DEFAULT 'terusan', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_rates_category_enum" AS ENUM('gate', 'wahana', 'venue', 'edukasi', 'rombongan')`);
        await queryRunner.query(`CREATE TABLE "ticket_rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" "public"."ticket_rates_category_enum" NOT NULL DEFAULT 'gate', "name" character varying(100) NOT NULL, "imageUrl" text, "price" integer NOT NULL DEFAULT '0', "description" text, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30d7c891cfe1f87301022909931" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket_rates"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_rates_category_enum"`);
        await queryRunner.query(`DROP TABLE "rides"`);
        await queryRunner.query(`DROP TYPE "public"."rides_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."rides_status_enum"`);
    }

}
