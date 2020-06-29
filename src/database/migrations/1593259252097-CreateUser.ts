import {MigrationInterface, QueryRunner} from "typeorm";
import dotenv from 'dotenv';
import {hash} from 'bcryptjs';
dotenv.config();

export class CreateUser1593259252097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let adminPassword: string = process.env.ADMIN_PASSWORD!;
        const hashedAdminPassword = await hash(adminPassword, 8);
        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE subjects(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL UNIQUE CHECK(name <> '')
        );
        INSERT INTO subjects(name)
        values ('Biologia'), ('Matemática'), ('Física'), ('Química'),
        ('Português'), ('Redação'), ('História'), ('Geografia');

        CREATE TABLE classes(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL UNIQUE CHECK(name <> '')
        );

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

        CREATE TABLE students(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            enrollment_number BIGINT UNIQUE NOT NULL,
            user_id UUID UNIQUE NOT NULL REFERENCES users(id)
        );

        INSERT INTO
        users(username, email, password, name, nickname, birthday)
        VALUES('dplucenio', 'dplucenio@gmail.com', '${hashedAdminPassword}', 'Daniel Plucenio', 'Daniel', DATE '1985-07-21');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE students;
        DROP TABLE users;
        DROP TABLE classes;
        DROP TABLE subjects;
        `)
    }
}