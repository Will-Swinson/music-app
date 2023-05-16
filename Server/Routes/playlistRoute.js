import express from "express";
const router = express.Router();

import { addSong } from "../Controllers/playlistController.js";

router.post("/", addSong);

export default router;
