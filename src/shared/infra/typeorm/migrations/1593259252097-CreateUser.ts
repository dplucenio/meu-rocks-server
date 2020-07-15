import { hash } from 'bcryptjs';
import dotenv from 'dotenv';
import { MigrationInterface, QueryRunner } from 'typeorm';

dotenv.config();

export default class CreateUser1593259252097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminPassword: string = process.env.ADMIN_PASSWORD as string;
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

        CREATE TYPE role AS ENUM ('admin', 'teacher', 'student');

        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            email VARCHAR NOT NULL UNIQUE CHECK(email <> ''),
            password VARCHAR NOT NULL CHECK(password <> ''),
            name VARCHAR NOT NULL CHECK(name <> ''),
            nickname VARCHAR NOT NULL CHECK(nickname <> ''),
            birthday TIMESTAMP WITH TIME ZONE NOT NULL,
            role role NOT NULL DEFAULT 'admin',
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );

        CREATE TABLE students(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            enrollment_number INT UNIQUE NOT NULL,
            user_id UUID UNIQUE NOT NULL REFERENCES users(id)
        );

        INSERT INTO
        users(email, password, name, nickname, birthday)
        VALUES('dplucenio@gmail.com', '${hashedAdminPassword}', 'Daniel Plucenio', 'Daniel', DATE '1985-07-21');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE students;
        DROP TABLE users;
        DROP TYPE role;
        DROP TABLE classes;
        DROP TABLE subjects;
        `);
  }
}
