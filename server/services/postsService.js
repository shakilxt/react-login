import db from "../config/db.js";

export const getAllPostsWithAuthors = async () => {
    const results = await db.query(`
        SELECT
            p.id,
            p.title,
            p.description,
            p.created_at,
            u.name,
            u.id as user_id,
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

export const updatePostById = async (postId, userId, postData) => {
    const { title, description } = postData;

    const setClauses = [];
    
    const values = [postId, userId];

    if (title !== undefined) {
        setClauses.push(`title = $${values.length + 1}`);
        values.push(title);
    }

    if (description !== undefined) {
        setClauses.push(`description = $${values.length + 1}`);
        values.push(description);
    }
    
    if (setClauses.length === 0) {
        return null; 
    }

    const setString = setClauses.join(', ');

    const query = `
        UPDATE posts 
        SET ${setString} 
        WHERE id = $1 AND user_id = $2 
        RETURNING *
    `;

    try {
        const { rows } = await db.query(query, values);
        return rows[0] || null;
    } catch (error) {
        console.error("Error updating post in service: ", error);
        throw error;
    }
};

export const deletePostById = async (postId, userId) => {
    const query = 'DELETE FROM posts WHERE id = $1 AND user_id = $2';
    const values = [postId, userId];
    const result = await db.query(query, values);
    return result.rowCount;
};