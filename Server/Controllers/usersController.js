import { error } from "console";
import { sql } from "../server.js";

export const getAllUsers = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM users;`;
    console.log(data);
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, password, email } = await req.body;
    console.log(username, password, email);
    const newUser = await sql`INSERT INTO users(username, password, email)
      VALUES(${username},${password},${email}) RETURNING *;`;
    res.status(200).json({
      status: "success",
      newUser,
    });
  } catch (err) {
    console.error(err);
  }
};
