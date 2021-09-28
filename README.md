# Agri-App

## Problem Identified

In the modern world, farmers and wholesale buyers with matching requirements need a way to quickly find and connect with each other.
Traditionally, farmers have marketed their harvest at regular times in physical locations, which were well-known to their regular customers. However, as the world changes, the urban and farming communities have grown farther apart, and it has become harder for farmers to connect with their customer base.
Especially following the COVID-19 pandemic, farmers and customers have been unable to rely on the physical marketplaces. Sales of essential goods such as farm produce cannot wait until the markets are reopened. There were many reported instances in Sri Lanka of farmers having to dispose of their harvest while vegetable prices shot up in urban areas.
Farmers may not always have access to electronic payment methods. Therefore, it is easier for a wholesale buyer and a farmer to simply share contact details and set up meetings to exchange goods and cash in person.
Also it is cumbersome for a wholesale buyer requiring specific types of goods to contact farmer after farmer searching for his requirement. Farmers also cannot guarantee the time of availability of their produce.
Therefore, a platform is needed, where the farmer can place advertisements(posts) for whatever type of product he has now, which a wholesale buyer can browse and express interest in via a private form of communication.

## Product Scope

This system allows farmers to publicly make posts about their newly harvested produce up for sale, and buyers to privately respond with a bid and their contact information. The farmer will be able to accept whichever bid he wishes, which renders the post closed to any other buyers.
Farmers can add new posts, update their existing posts to reflect new information, view all their posts and requests received, and delete any of them. Buyers can filter posts by the type of product they need, send request messages in response to a post, and view all their previous request messages.
Farmers and buyers will be required to create and log in to accounts in order to interact with the system. They can update their personal information in these accounts or delete them at any time.
The third category of registered user is Admin. An Admin has the ability to view all users and posts, and delete any post and any profile.

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
DATABASE_URL=postgres://agri_app:password@localhost:5432/agri_app_db
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
