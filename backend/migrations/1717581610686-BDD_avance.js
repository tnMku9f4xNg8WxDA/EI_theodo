import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class BDDAvance1717581610686 {
    name = 'BDDAvance1717581610686'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_categories_genre" (
                "movieId" integer NOT NULL,
                "genreId" integer NOT NULL,
                PRIMARY KEY ("movieId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" integer NOT NULL,
                "id_user" integer NOT NULL,
                "id_film" integer NOT NULL,
                "is_a_like" boolean NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "date")
            SELECT "id",
                "title",
                "date"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
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
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "date",
                    "id_user",
                    "id_film",
                    "is_a_like",
                    "description",
                    "note"
                )
            SELECT "id",
                "title",
                "date",
                "id_user",
                "id_film",
                "is_a_like",
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
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
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
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
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
            CREATE INDEX "IDX_5eb1cf4f3984bba73da5b30a72" ON "movie_categories_genre" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3920e1b3b392d531456b11a0a0" ON "movie_categories_genre" ("movieId")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" integer NOT NULL,
                "id_user" integer NOT NULL,
                "id_film" integer NOT NULL,
                "is_a_like" boolean NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "date",
                    "id_user",
                    "id_film",
                    "is_a_like",
                    "description",
                    "note"
                )
            SELECT "id",
                "title",
                "date",
                "id_user",
                "id_film",
                "is_a_like",
                "description",
                "note"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "date")
            SELECT "id",
                "title",
                "date"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5eb1cf4f3984bba73da5b30a72"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3920e1b3b392d531456b11a0a0"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_categories_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }
}
