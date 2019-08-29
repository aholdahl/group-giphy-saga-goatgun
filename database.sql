CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

--Favorite table
CREATE TABLE "favorite" (
    "id" SERIAL PRIMARY KEY,
    "url" TEXT,
    "category_id" INT
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('polybius'), ('cartoon'), ('nsfw'), ('meme'), ('goat');

--POST for Favorite table
INSERT INTO "favorite" ("url") 
VALUES ('https://giphy.com/gifs/GTkhJ3Aj3p064/html5');

--GET for Favorite table (do not use, see below)
--SELECT "url", "category_id" FROM "favorite" ORDER BY "id" DESC;

--GET for Category table
SELECT * FROM "category" ORDER BY "name" ASC;

--GET request for Favorite_Category
SELECT "favorite"."id", "favorite"."url", "category"."name" AS "category" FROM "favorite" LEFT JOIN "category" ON "favorite"."category_id" = "category"."id";

--PUT for Favorite table
UPDATE "favorite" SET "category_id" = 6 WHERE "id" = 1;

--DELETE for Favorite table
DELETE FROM "favorite" WHERE "id" = 1;
