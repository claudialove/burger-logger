-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS burger_db;

-- Created the DB "burger_db" (only works on local connections)
CREATE DATABASE burger_db;

-- Use the DB "burger_db" for all the rest of the script
USE burger_db;

-- Created the table "burger"
CREATE TABLE burger (
  id int AUTO_INCREMENT NOT NULL,
  burger_name varchar(100) NOT NULL,
  devoured boolean,
  PRIMARY KEY(id)
);


