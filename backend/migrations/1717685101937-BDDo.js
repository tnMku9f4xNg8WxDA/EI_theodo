import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class BDDo1717685101937 {
    name = 'BDDo1717685101937'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temp_eval" (
                "id" integer PRIMARY KEY NOT NULL,
                "note" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "is_a_like" boolean NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_evaluation_film"("id", "is_a_like")
            SELECT "id",
                "is_a_like"
            FROM "evaluation_film"
        `);
        await queryRunner.query(`
            DROP TABLE "evaluation_film"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_evaluation_film"
                RENAME TO "evaluation_film"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_categories_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_categories_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "movie_categories_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_categories_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_categories_genre"
                RENAME TO "movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_genre" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_genre"("id", "name")
            SELECT "id",
                "name"
            FROM "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_genre"
                RENAME TO "genre"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_categories_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_3920e1b3b392d531456b11a0a05" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_5eb1cf4f3984bba73da5b30a724" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_categories_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "movie_categories_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_categories_genre"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_categories_genre"
                RENAME TO "movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_categories_genre"
                RENAME TO "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_categories_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_categories_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "genre"
                RENAME TO "temporary_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "genre"("id", "name")
            SELECT "id",
                "name"
            FROM "temporary_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_genre"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_categories_genre"
                RENAME TO "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_categories_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "FK_5eb1cf4f3984bba73da5b30a724" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_categories_genre"("movieId", "genreId")
            SELECT "movieId",
                "genreId"
            FROM "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_categories_genre"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "evaluation_film"
                RENAME TO "temporary_evaluation_film"
        `);
        await queryRunner.query(`
            CREATE TABLE "evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "id_user" integer NOT NULL,
                "id_film" integer NOT NULL,
                "is_a_like" boolean NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "evaluation_film"("id", "is_a_like")
            SELECT "id",
                "is_a_like"
            FROM "temporary_evaluation_film"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_evaluation_film"
        `);
        await queryRunner.query(`
            DROP TABLE "temp_eval"
        `);
    }
}
