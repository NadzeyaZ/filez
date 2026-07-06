import { getAllFiles } from "#db/queries/files";
import express from "express";

const router = express.Router();
export default router;

// GET /folders sends array of all folders

// GET /folders/:id
// Sends 404 error message if folder doesn't exist
// Sends the folder specified by id, including an array of all files in that folder under the files key of the folder object.
// In your SQL query, use json_agg instead of to_json for array instead of object.

// POST /folders/:id/files
// Sends 404 error message if folder doesn't exist
// Sends 400 if request body is not provided
// Sends 400 if request body is missing required fields
// Creates a new file related to the specified folder and sends the file back with status 201
