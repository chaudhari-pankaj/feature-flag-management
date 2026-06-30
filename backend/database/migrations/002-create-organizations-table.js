import { pool } from '../connectDB.js'

export const up = async() => {
    const createOrganizationsTableQuery = `CREATE TABLE IF NOT EXISTS organizations (
        organization_id VARCHAR(50) PRIMARY KEY,
        organization_name VARCHAR(32) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    try {
        const response = await pool.query(createOrganizationsTableQuery);
        return response;
    }
    catch(err) {
        throw new Error("Could not create organizations table", {
            cause : err
        });
    }
}