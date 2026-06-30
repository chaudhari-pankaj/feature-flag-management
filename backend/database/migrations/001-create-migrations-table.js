import { pool } from '../connectDB.js';

export const up = async() => {
    const createMigrationsTableQuery = `CREATE TABLE IF NOT EXISTS migrations (
        migration_id VARCHAR(50) PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        ran_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    
    try {
        const response = await pool.query(createMigrationsTableQuery);
        console.log("debugg",response);
        return response; 
    }
    catch(err) {
        throw new Error("Could not create migrations table", {
            cause : err
        });
    }
}