-- TODO
-- Write db/schema.sql to create tables according to the schema above.
-- The name column of folders is unique.
-- The combination of name and folder_id of files is unique. (see docs!)
-- There is a one-many relation: one folder can have many files.
-- Folder deletion should cascade to all related files.
DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE files(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER NOT NULL,
    folder_id INTEGER NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE (name, folder_id)
);