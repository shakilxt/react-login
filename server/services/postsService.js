import db from "../config/db.js";

export const getAllPostsWithAuthors = async () => {
    const results = await db.query(`
        SELECT
            p.id,
            p.title,
            p.description,
            p.created_at,
            u.name,
            u.email
        FROM
            posts p
        LEFT JOIN
            users u ON p.user_id = u.id
        ORDER BY
            p.created_at DESC
    `)
    return results.rows;
}

export const createPost = async (postData, userId) => {
    const { title, description } = postData;
    const query = `
        WITH new_post AS (
            INSERT INTO posts (user_id, title, description)
            VALUES ($1, $2, $3)
            RETURNING *
        )
        SELECT 
            np.id, 
            np.title, 
            np.description, 
            np.created_at, 
            u.name, 
            u.email 
        FROM 
            new_post np
        JOIN 
            users u ON np.user_id = u.id;
    `;
    const values = [userId, title, description];
    const result = await db.query(query, values);
    return result.rows[0];
};

// export const createPost = async (postData, userId) => {
//     const { title, description } = postData;
//     const result = await db.query(
//         'INSERT INTO posts (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
//         [title, description, userId]
//     );
//     return result.rows[0];
// }