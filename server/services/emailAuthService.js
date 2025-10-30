import db from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {

    const portraits = ['https://randomuser.me/api/portraits/men/90.jpg', 'https://randomuser.me/api/portraits/men/10.jpg', 'https://randomuser.me/api/portraits/men/11.jpg',
        'https://randomuser.me/api/portraits/men/31.jpg', 'https://randomuser.me/api/portraits/men/49.jpg', 'https://randomuser.me/api/portraits/men/99.jpg',
        'https://randomuser.me/api/portraits/men/92.jpg', 'https://randomuser.me/api/portraits/men/88.jpg', 'https://randomuser.me/api/portraits/men/38.jpg',
        'https://randomuser.me/api/portraits/men/39.jpg', 'https://randomuser.me/api/portraits/men/9.jpg'
    ]

    const professions = ['Engineer', 'Doctor', 'Artist', 'Teacher', 'Developer', 'Designer', 'Architect', 'Chef', 'Musician', 'Writer', 'Photographer'];

    const randomPortrait = () => {
        const index = Math.floor(Math.random() * portraits.length);
        return portraits[index];
    }

    const randomProfession = () => {
        const index = Math.floor(Math.random() * professions.length);
        return professions[index];
    }

    const { name, email, password } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
        "INSERT INTO users (name, email, password, portrait, profession) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email",
        [name, email, hashedPassword, randomPortrait(), randomProfession()]
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