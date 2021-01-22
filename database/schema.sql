DROP DOMAIN IF EXISTS UUID4 CASCADE;
DROP DOMAIN IF EXISTS VALID_CONTACT_NO CASCADE;

DROP TABLE IF EXISTS UserInfo CASCADE;
DROP TABLE IF EXISTS Farmer  CASCADE;
DROP TABLE IF EXISTS Buyer CASCADE;
DROP TABLE IF EXISTS Post CASCADE;
DROP TABLE IF EXISTS Complain CASCADE;
DROP TABLE IF EXISTS Buyer_Request CASCADE;
DROP TABLE IF EXISTS session CASCADE;

DROP TYPE IF EXISTS  Account_Type;
DROP TYPE IF EXISTS  Category;
DROP TYPE IF EXISTS  Complain_State;
DROP TYPE IF EXISTS  Post_State;
DROP TYPE IF EXISTS  District_Name;
DROP TYPE IF EXISTS  Gender_Type;


---------------------------------- ENUMS SCHEMA ------------------------------------

CREATE TYPE Account_Type As ENUM(
'admin',
'buyer',
'farmer'
);

CREATE TYPE Category AS ENUM(
'vegetable',
'fruit'
);  

CREATE TYPE Complain_State AS ENUM(
'new',
'handled'
);  

CREATE TYPE Post_State AS ENUM(
'Active',
'Expired',
'Sold'
);

CREATE TYPE Gender_Type AS ENUM(
'Male',
'Female',
'Other'
);

CREATE TYPE District_Name As ENUM(
'Anuradhapura',
'Ampara',
'Badulla',
'Batticaloa',
'Colombo',
'Galle',
'Gampaha',
'Hambantota',
'Jaffna',
'Kalutara',
'Kandy',
'Kegalle',
'Kilinochchi',
'Kurunegala',
'Mannar',
'Matale',
'Matara',
'Moneragala',
'Mullaitivu',
'Nuwara Eliya',
'Polonnaruwa',
'Puttalam',
'Ratnapura',
'Trincomalee',
'Vavuniya'
);
------------------------------------DOMAIN SCHEMA ---------------------------------------

CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');

CREATE DOMAIN VALID_CONTACT_NO AS CHAR(10);


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

-- user table
CREATE TABLE UserInfo (
  uid uuid4 DEFAULT generate_uuid4 (), -- auto generated
  type ACCOUNT_TYPE not null,
  email varchar(127) not null unique,
  password varchar(255) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  gender Gender_Type not null,
  banned boolean DEFAULT false not null,
  joined timestamp not null DEFAULT NOW(),
  PRIMARY KEY (uid)
);

-- farmer table
CREATE TABLE Farmer (
  uid uuid4,
  nic varchar(15) not null UNIQUE,
  contact_no valid_contact_no not null,
  district district_name not null,
  address varchar(127),
  PRIMARY KEY (uid),
  FOREIGN KEY(uid) REFERENCES UserInfo(uid) ON DELETE CASCADE ON UPDATE CASCADE
);

--buyer table
CREATE TABLE Buyer (
  uid uuid4,
  nic varchar(15) not null UNIQUE,
  contact_no valid_contact_no not null,
  district district_name not null,
  PRIMARY KEY (uid),
  FOREIGN KEY(uid) REFERENCES UserInfo(uid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Complain (
  comp_id uuid4 DEFAULT generate_uuid4 (), -- auto generated
  uid uuid4 not null,--person who the complain is about
  complainer_id uuid4 not null,-- person who is complaining
  body varchar(511) not null,-- message text
  status Complain_State DEFAULT 'new',
  PRIMARY KEY (comp_id),
  FOREIGN KEY(uid) REFERENCES UserInfo(uid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(complainer_id) REFERENCES UserInfo(uid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Post (
  post_id uuid4 DEFAULT generate_uuid4 (), -- auto generated
  farmer_id uuid4 not null,
  product_name varchar(31) not null,
  title varchar(63) not null,
  description varchar(999) not null,
  product_category Category not null,
  quantity numeric(20,2) not null,
  expected_price numeric(20,2) not null,
  available_district district_name not null,
  available_address varchar(127) not null,
  contact_no valid_contact_no not null,
  status Post_State not null DEFAULT 'Active',
  added_day DATE not null,
  exp_day DATE not null,
  img_data VARCHAR(255) null, -- change to image bytes if needed
  PRIMARY KEY (post_id),
  FOREIGN KEY(farmer_id) REFERENCES Farmer(uid) ON DELETE CASCADE ON UPDATE CASCADE
);




CREATE TABLE Buyer_Request (
  req_msg_id uuid4 DEFAULT generate_uuid4 (), -- auto generated
  buyer_id uuid4 not null,
  post_id uuid4 not null,
  PRIMARY KEY (req_msg_id),
  FOREIGN KEY(buyer_id) REFERENCES Buyer(uid) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(post_id) REFERENCES Post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

----------------------------------- Indices Schema ----------------------------------------------


------------------------------------ Session Sceham ----------------------------------------------
---------------------------------- SESSION TABLE SCHEMA -----------------------------------

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

---------------------------------- SCHEMA END ---------------------------------------------
------------------------------------ GRANT -------------------------------------------------

GRANT EXECUTE ON FUNCTION public.generate_uuid4() TO agri_app;

GRANT ALL ON TABLE public.buyer TO agri_app;

GRANT ALL ON TABLE public.buyer_request TO agri_app;

GRANT ALL ON TABLE public.complain TO agri_app;

GRANT ALL ON TABLE public.farmer TO agri_app;

GRANT ALL ON TABLE public.post TO agri_app;

GRANT ALL ON TABLE public.session TO agri_app;

GRANT ALL ON TABLE public.userinfo TO agri_app;



