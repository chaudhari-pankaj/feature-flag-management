import { pool } from '../connectDB.js'

export const up = async() => {
    const createRolesTableQuery = `CREATE TABLE IF NOT EXISTS roles (
        role_id VARCHAR(50) PRIMARY KEY,
        role_name VARCHAR(20) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    try {
       const response = await pool.query(createRolesTableQuery);
       return response;
    }
    catch(err) {
        throw new Error("Could not create Roles table", {
            cause : err
        });
    }
}