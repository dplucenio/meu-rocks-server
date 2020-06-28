import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1593259252097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR NOT NULL UNIQUE CHECK(username <> ''),
            email VARCHAR NOT NULL UNIQUE CHECK(email <> ''),
            password VARCHAR NOT NULL CHECK(password <> ''),
            name VARCHAR NOT NULL CHECK(name <> ''),
            nickname VARCHAR NOT NULL CHECK(nickname <> ''),
            birthday DATE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );
        INSERT INTO
        users(username, email, password, name, nickname, birthday)
        VALUES('dplucenio', 'dplucenio@gmail.com', '123', 'Daniel Plucenio', 'Daniel', DATE '1985-07-21');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`)
    }
}
