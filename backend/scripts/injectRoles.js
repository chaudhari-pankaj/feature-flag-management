import { pool } from '../database/connectDB.js';
import { randomUUID } from 'node:crypto';

export const injectRoles = async() => {
    const injectRolesQuery = `INSERT IGNORE INTO roles (role_id, role_name)
        VALUES (?,?)`;
    try {
        //fetching existing roles if any 
        const [roles] = await pool.query(`SELECT role_name from roles`);
        let roleNames = [];
        for(let i = 0; i < roles.length; i++)
            roleNames.push(roles[i].role_name);
        //injecting roles
        if(!roleNames.includes("superAdmin")) {
           await pool.query(injectRolesQuery,[randomUUID(),"superAdmin"]);
           console.log("injected superAdmin role");
        }
        if(!roleNames.includes("admin")) {
           await pool.query(injectRolesQuery,[randomUUID(),"admin"]);
           console.log("injected admin role");
        }
        if(!roleNames.includes("endUser")) {
           await pool.query(injectRolesQuery,[randomUUID(),"endUser"]);
           console.log("injected endUser role");
        }
    }
    catch(err) {
        throw new Error("Could not inject predefined roles", {
            cause : err
        });
    }
}