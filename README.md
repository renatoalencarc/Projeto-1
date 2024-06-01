# This repository is just a simple ToDo App made with Svelte, tailwind and postgres database. Feel free to modify and use as template

Technologies used:

```FRONTEND
-Sveltekit
-Tailwindcss
```

```BACKEND
-NodeJS
```

```DATABASE
-postgresql
```

# Get started

Install the dependencies

```
cd svelte-todo
npm install
```

```
cd todo-app
npm install
```

You can run the npm run dev to see the frontend actually working, but there's another one more setup.

You'll need to setup the database.

# Database

Download the [Postgresql](https://www.postgresql.org/download/) here and setup your credentials.

After that, open your terminal and follow up the commands:

Necessary commands for the creation of the database and it's respective tables.

```terminal
psql -h localhost -p 5432 -U postgres
```

```
CREATE DATABASE todolist;
```

```
*\c todolist;
```

```
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE
);
```

With this you should have the database working fine. You can confirm that by opening your PgAdmin and check everything to see if it's ok.

# Backend Setup

Edit your [server.js] credentials with yours, and run [node server.js].

With this you (should) have a simple todo app with a simple frontend, backend and database.