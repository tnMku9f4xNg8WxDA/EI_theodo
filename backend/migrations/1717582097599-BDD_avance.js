import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class BDDAvance1717582097599 {
    name = 'BDDAvance1717582097599'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "id_user" integer NOT NULL,
                "id_film" integer NOT NULL,
                "is_a_like" boolean NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "date", "description", "note")
            SELECT "id",
                "title",
                "date",
                "description",
                "note"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" datetime NOT NULL,
                "id_user" integer NOT NULL,
                "id_film" integer NOT NULL,
                "is_a_like" boolean NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "date", "description", "note")
            SELECT "id",
                "title",
                "date",
                "description",
                "note"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "evaluation_film"
        `);
    }
}
