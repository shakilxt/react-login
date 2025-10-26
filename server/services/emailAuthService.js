import db from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {

    const { name, email, password } = userData;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
        [name, email, hashedPassword]
    );

    return result.rows[0];
}

export const findUserByEmail = async (email) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
}

export const saveRefreshToken = async (userId, refreshToken) => {
    await db.query(
        "UPDATE users SET refresh_token = $1 WHERE id = $2",
        [refreshToken, userId]
    );
}

export const findUserByRefreshToken = async (refreshToken) => {
    const result = await db.query(
        "SELECT * FROM users WHERE refresh_token = $1",
        [refreshToken]
    );
    return result.rows[0];
}

export const revokeRefreshToken = async (refreshToken) => {
    await db.query(
        "UPDATE users SET refresh_token = NULL WHERE refresh_token = $1",
        [refreshToken]
    );
}