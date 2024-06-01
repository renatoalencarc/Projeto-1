psql -h localhost -p 5432 -U postgres

CREATE DATABASE todolist;

\c todolist;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE
);

