import { MigrationInterface, QueryRunner } from "typeorm";

export class test1659081290293 implements MigrationInterface {
    name = 'test1659081290293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "EventReplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author" character varying NOT NULL, "reply" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "eventId" uuid, CONSTRAINT "PK_50ae7c2e32b493049a1bad55591" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "content" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efc6f7ffffa26a4d4fe5f383a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "content" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16b37fe12269a757371d4dd3d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" text NOT NULL, "price" integer NOT NULL, "size" text NOT NULL, "color" text NOT NULL, "liked" integer NOT NULL DEFAULT '0', "brand" character varying NOT NULL, "thumbnail" character varying NOT NULL, "photos" text NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f780eacad4a3c31f7a38f0b0b4" ON "Products" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_18e20da132f1a526a2660119f8" ON "Products" ("brand") `);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying(16), "nick_name" character varying(48) NOT NULL, "photo_url" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_certified" boolean NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "UQ_7d1289dc9ff316b316cf560007d" UNIQUE ("nick_name"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c3ab3f49a87e6ddb607f3c494" ON "Users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_ffc81a3b97dcbf8e320d5106c0" ON "Users" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_932652535a6e452f74d450dfb7" ON "Users" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_cfeb5fd686c6bd1a04bf1387f3" ON "Users" ("is_certified") `);
        await queryRunner.query(`CREATE TABLE "SocialAccounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "social_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_fabc61aedc4b4f0a782f9d4b157" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1af0bcc07b264abb83141a43ec" ON "SocialAccounts" ("social_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ada0fde7be07278e5667fd628" ON "SocialAccounts" ("created_at") `);
        await queryRunner.query(`ALTER TABLE "EventReplies" ADD CONSTRAINT "FK_b258a04c16eb84a6e273fd88a80" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SocialAccounts" ADD CONSTRAINT "FK_d3dfac8bafff763f3c4594785ef" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialAccounts" DROP CONSTRAINT "FK_d3dfac8bafff763f3c4594785ef"`);
        await queryRunner.query(`ALTER TABLE "EventReplies" DROP CONSTRAINT "FK_b258a04c16eb84a6e273fd88a80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ada0fde7be07278e5667fd628"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1af0bcc07b264abb83141a43ec"`);
        await queryRunner.query(`DROP TABLE "SocialAccounts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfeb5fd686c6bd1a04bf1387f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_932652535a6e452f74d450dfb7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ffc81a3b97dcbf8e320d5106c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c3ab3f49a87e6ddb607f3c494"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18e20da132f1a526a2660119f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f780eacad4a3c31f7a38f0b0b4"`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP TABLE "Notices"`);
        await queryRunner.query(`DROP TABLE "Events"`);
        await queryRunner.query(`DROP TABLE "EventReplies"`);
    }

}
