import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class BDD31717704374701 {
    name = 'BDD31717704374701'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL,
                "link" varchar NOT NULL,
                "note_adaptée" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "date",
                    "description",
                    "note",
                    "link"
                )
            SELECT "id",
                "title",
                "date",
                "description",
                "note",
                "link"
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
                "description" varchar NOT NULL,
                "note" integer NOT NULL,
                "link" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "date",
                    "description",
                    "note",
                    "link"
                )
            SELECT "id",
                "title",
                "date",
                "description",
                "note",
                "link"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
