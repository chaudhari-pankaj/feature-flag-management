import { pool } from '../database/connectDB.js';
const createMigrationsTable = await import('../database/migrations/001-create-migrations-table.js');
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

export const runMigrations = async() => {
    try {
        await createMigrationsTable.up();
        const [response] = await pool.query('SELECT filename FROM migrations');
        let migratedFiles = [];
        for(let i = 0; i < response.length; i++) {
            migratedFiles.push(response[i].filename);
        }
        const files = await fs.readdir('../database/migrations');
        files.sort();
        for(let i = 0; i < files.length; i++) {
            try {
                let migrationFile = await import(`../database/migrations/${files[i]}`)
                if(migratedFiles.includes(files[i]))
                    continue;
                await migrationFile.up();
                await pool.query(`INSERT INTO migrations (migration_id,filename)
                    VALUES (?,?)
                    `,[randomUUID(),files[i]]);
                console.log(`Migration file ${files[i]} successfully ran`);   
            }
            catch(err) {
                throw new Error(`Could not run migration file : ${files[i]}`, {
                    cause : err
                });
            }
        }    
    }
    catch(err) {
        throw new Error("Could not run migrations", {
            cause : err
        });
    }
}