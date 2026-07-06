import db from "#db/client";

export async function createFolder({ name }) {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
    `;
  const { rows } = await db.query(sql, [name]);
  return rows[0];
}

export async function getAllFolders() {
  const sql = `
    SELECT * FROM folders;
    `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getFolderById(id) {
  const sql = `
    SELECT *, 
    (
      SELECT json_agg(files)
      FROM files
      WHERE files.folder_id = folders.id
    ) AS files 
    FROM folders 
    WHERE id = $1;
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}
