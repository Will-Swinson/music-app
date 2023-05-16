import { error } from "console";
import { sql } from "../server.js";

export const addSong = async (req, res) => {
  const song = req.body;

  res.json({ song });
};

export const getPlaylist = async (req, res) => {};
