import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1593259252097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR NOT NULL CHECK(first_name <> ''),
            last_name VARCHAR NOT NULL CHECK(last_name <> ''),
            birthday DATE NOT NULL,
            UNIQUE(first_name, last_name)
        );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`)
    }
}
