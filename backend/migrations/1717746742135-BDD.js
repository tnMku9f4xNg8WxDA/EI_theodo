import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class BDD1717746742135 {
    name = 'BDD1717746742135'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "is_a_like" boolean NOT NULL,
                "filmId" integer,
                "userId" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "note" integer NOT NULL,
                "link" varchar NOT NULL,
                "note_user" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
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
            CREATE TABLE "temporary_evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "is_a_like" boolean NOT NULL,
                "filmId" integer,
                "userId" integer,
                CONSTRAINT "FK_5e1fead1f1783b1fdb34fb5b0a2" FOREIGN KEY ("filmId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_fe47ab58156ae3aa63eb17840b2" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_evaluation_film"("id", "is_a_like", "filmId", "userId")
            SELECT "id",
                "is_a_like",
                "filmId",
                "userId"
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
            ALTER TABLE "evaluation_film"
                RENAME TO "temporary_evaluation_film"
        `);
        await queryRunner.query(`
            CREATE TABLE "evaluation_film" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "is_a_like" boolean NOT NULL,
                "filmId" integer,
                "userId" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "evaluation_film"("id", "is_a_like", "filmId", "userId")
            SELECT "id",
                "is_a_like",
                "filmId",
                "userId"
            FROM "temporary_evaluation_film"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_evaluation_film"
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
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "evaluation_film"
        `);
    }
}
