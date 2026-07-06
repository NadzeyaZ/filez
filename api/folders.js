import { createFile } from "#db/queries/files";
import { getAllFolders, getFolderById } from "#db/queries/folders";
import express from "express";

const router = express.Router();
export default router;

// GET /folders sends array of all folders
router.get("/", async (req, res) => {
  const allFolders = await getAllFolders();
  return res.send(allFolders);
});

// GET /folders/:id
// Sends 404 error message if folder doesn't exist
// Sends the folder specified by id, including an array of all files in that folder under the files key of the folder object.
// In your SQL query, use json_agg instead of to_json for array instead of object.
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send();
  }
  return res.status(200).send(folder);
});
// POST /folders/:id/files
// Sends 404 error message if folder doesn't exist
// Sends 400 if request body is not provided
// Sends 400 if request body is missing required fields
// Creates a new file related to the specified folder and sends the file back with status 201

router.post("/:id/files", async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    return res.status(400).send();
  }
  if (!req.body.name) {
    return res.status(400).send();
  }
  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send();
  }
  const file = await createFile(req.body, id);
  if (!file) {
    res.status(404);
  }
  return res.status(201).send(file);
});
