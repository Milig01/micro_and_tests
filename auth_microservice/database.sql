--CREATE DATABASE "user";

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "hash" TEXT NOT NULL
);

CREATE TABLE "roles" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "user_roles_role" (
    "userId" INTEGER REFERENCES "user"("id"),
    "roleId" INTEGER REFERENCES "role"("id")
);