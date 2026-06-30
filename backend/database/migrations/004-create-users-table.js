import { pool } from '../connectDB.js'

export const up = async() => {
    const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(50) PRIMARY KEY,
        user_name VARCHAR(32) NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        role_id VARCHAR(50) NOT NULL,
        organization_id VARCHAR(50) NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_users_roles
            FOREIGN KEY (role_id) REFERENCES roles(role_id),
        CONSTRAINT fk_users_organizations
            FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
    )`;
    try {
        const response = await pool.query(createUsersTableQuery);
        return response;
    }
    catch(err) {
        throw new Error("Could not create Users table", {
            cause : err,
        });
    }
}