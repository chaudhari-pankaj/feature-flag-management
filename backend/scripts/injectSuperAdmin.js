import { randomUUID } from 'node:crypto';
import { pool } from '../database/connectDB.js';

export const injectSuperAdmin = async() => {
    const injectSuperAdminQuery = `INSERT INTO users (user_id,user_name,password,email,role_id,organization_id)
    VALUES (?,?,?,?,?,?)`;
    try {
        //get role_id of superAdmin
        const [response] = await pool.query(`SELECT role_id FROM roles WHERE role_name = ?`,["superAdmin"]); 
        const superAdminRoleID = response[0].role_id;
        //check if superAdmin has already been inserted
        const [superAdmins] = await pool.query(`SELECT * FROM users WHERE role_id = ?`,[superAdminRoleID]);
        //if superAdmin already exists ignore
        if(superAdmins.length) {
            return;
        }
        //create organization for superAdmin
        const superAdminOrgId = randomUUID();
        await pool.query(`INSERT IGNORE INTO organizations (organization_id,organization_name)
            VALUES (?,?)`,[superAdminOrgId,"SYSTEM"]);
        //if superAdmin does not exist inject
        await pool.query(injectSuperAdminQuery,[randomUUID(),process.env.SUPER_ADMIN_USERNAME,process.env.SUPER_ADMIN_PASSWORD,process.env.SUPER_ADMIN_EMAIL,superAdminRoleID,superAdminOrgId]);
        console.log("Injected Super Admin Credentials");
    }
    catch(err) {
        throw new Error("Could not inject Super Admin user", {
            cause : err
        });
    }
}