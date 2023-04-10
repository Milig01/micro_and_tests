--CREATE DATABASE "profile";

CREATE TABLE "profiles" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE
);