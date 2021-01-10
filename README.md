# Agri-App

## Guide

### Database setup

#### Windows

Install [postgresql](https://www.postgresql.org/) in the local machine and setup correctly. Use following command to login to the `psql` shell as postgres user.Use the following command on terminal

```bash
psql -U postgres
```

 Then enter below commands.

```sql
CREATE ROLE agri_app WITH LOGIN PASSWORD 'password';
CREATE DATABASE agri_app_db;
GRANT ALL PRIVILEGES ON DATABASE agri_app_db TO agri_app;
\q
```

Then login to `psql` as `agri_app`.

```bash
psql -U agri_app agri_app_db
```

Download `database` directory from this repo and then in the shell,
import the current DDL and DML schema. Here give the full path to the schema

```sql
\i 'C:/Users/.../database/schema.sql'
\q
```

Login to pgAdmin (Search in start menu) using the username and password used in the installation process of postgres.


Then rclick Server>postgres>Databases and check for `agri_app_db`. Then you can expand it go to Schemas>Tables>Table_Name>rclick>View edit data>All rows 

(Optional)
To run sql queries using pgAdmin rclick the database and select query tool.

Now you are done with the database setup.


#### Apple

 Hope the same method works. Good Luck! :stuck_out_tongue_winking_eye:

### Node.js setup

First clone this project directory.

```bash
git clone https://github.com/Avishka-Shamendra/agri-app.git
```

Install

* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/get-npm)
* [nodemon](https://www.npmjs.com/package/nodemon)



 After that go to the project directory and run `npm install`. It is better if you do it every time you pull any changes for the repo

```bash
cd directory/project
npm install
```

If no .env file is in the repo
Create a `.env` file in the root with following content.
You may change database user/password/secret as you may wish.

```text
DATABASE_URL=postgres://agri_app:password@localhost:5432/agri_db
PORT=3000


REG_KEY = qmYwp6J3yJO3TQKPaVTuUQnFGU6gCAxu
SESSION_SECRET=secret
```

Then use `nodemon` or `node` to serve the pages.Nodemon is recommended

```bash
nodemon start # If nodemon is installed
node index.js # otherwise
```

Now visit <http://localhost:3000/> and confirm that site is running.

### VS Code Setup

Dont install any sql extensions. They may show errors of schema.sql file without detecting this is for postgres.

Use material icon theme extension for a nice view of folders :) 