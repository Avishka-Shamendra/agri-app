DROP TABLE IF EXISTS Category CASCADE;


---------------------------------- ENUMS SCHEMA ------------------------------------

CREATE TYPE Category AS ENUM(
'vegetable',
'fruit'
);  
------------------------------------DOMAIN SCHEMA ---------------------------------------

CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');


----------------------------------  FUNCTION SCHEMA  ------------------------------------

--Function to create UUID for tables
CREATE OR REPLACE FUNCTION generate_uuid4 ()
    RETURNS char( 36
)
AS $$
DECLARE
    var_uuid char(36);
BEGIN
    SELECT
        uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text)
            PLACING '4' FROM 13)
        PLACING to_hex(floor(random() * (11 - 8 + 1) + 8)::int)::text FROM 17)::cstring) INTO var_uuid;
    RETURN var_uuid;
END
$$
LANGUAGE PLpgSQL;
---------------------------------------TABLE SCHEMA------------------------------------------------

-- common user table
CREATE TABLE User (
  uid uuid4 DEFAULT generate_uuid4 (), -- auto generated
  password varchar(255) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(127) not null unique,
  PRIMARY KEY (uid)
);


CREATE TABLE Farmer (
  uid uuid4,
  nic,
  contact_number,
  district ,
  complain_count int,
  banned boolean DEFAULT false,
  PRIMARY KEY (uid)
  FOREIGN KEY(uid) REFERENCES User(uid) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE "Admin" (
  "uid" varchar(10),
  PRIMARY KEY ("uid")
);



CREATE TABLE "Buyer" (
  "uid" varchar(10),
  PRIMARY KEY ("uid")
);

CREATE TABLE "Complain" (
  "comp_id" varchar(17),
  "uid" varchar(10),
  "complainer_id" varchar(10),
  "body" varchar(400),
  "status" enum(),
  PRIMARY KEY ("comp_id")
);

CREATE TABLE "Buyer_request" (
  "msg_id" varchar(10),
  "buyer_id" varchar(10),
  "pinned_post_id" varchar(15),
  PRIMARY KEY ("msg_id")
);

CREATE TABLE "Post" (
  "post_id" varchar(15),
  "uid" varchar(10),
  "product" varchar(30),
  "description" text,
  "cat_id" int,
  "unit_prize" numeric(8,2),
  "img_urt" text,
  "status" enum(),
  "close_time" datetime,
  PRIMARY KEY ("post_id")
);


