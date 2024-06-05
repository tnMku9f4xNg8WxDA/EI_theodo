import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class MoviesEspoir1717506659967 {
    name = 'MoviesEspoir1717506659967'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" integer NOT NULL
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
