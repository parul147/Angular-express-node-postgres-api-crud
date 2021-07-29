/* creating a database*/
CREATE DATABASE user_database;

--\c into user_database
/* creating a table*/
CREATE TABLE user_table(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30),
    middlename VARCHAR(30),
      lastname VARCHAR(30),
       email VARCHAR(30),
        phonenumber VARCHAR(10),
        role VARCHAR(30),
        address VARCHAR(50)
);

