import { pool } from '../connectDB.js'

export const up = async() => {
    const createFeatureFlagsTableQuery = `CREATE TABLE IF NOT EXISTS feature_flags (
        feature_flag_id VARCHAR(50) PRIMARY KEY,
        feature_key VARCHAR(32) NOT NULL,
        organization_id VARCHAR(50) NOT NULL,
        description TEXT,
        is_enabled BOOL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by_user_id VARCHAR(50),
        CONSTRAINT fk_feature_flags_users
            FOREIGN KEY (created_by_user_id) REFERENCES users(user_id),
        CONSTRAINT fk_feature_flags_organizations
            FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
    )`;

    try {
        const response = await pool.query(createFeatureFlagsTableQuery);
        return response;
    }
    catch(err) {
        throw new Error("Could not create Feature flags table", {
            cause : err
        });
    }
}