import { pool } from '../database/connectDB.js';
const createMigrationsTable = await import('../database/migrations/001-create-migrations-table.js');
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

export const runMigrations = async() => {
    try {
        //get all migration files
        const files = await fs.readdir('../database/migrations');
        files.sort();
        
        //create migrations table
        let createMigrationsTable = await import(`../database/migrations/${files[0]}`);
        await createMigrationsTable.up();
        console.log(`Migration file ${files[0]} successfully ran`);   

        //get all the migration files that have been previously run
        const [response] = await pool.query('SELECT filename FROM migrations');
        let migratedFiles = [];
        for(let i = 0; i < response.length; i++) {
            migratedFiles.push(response[i].filename);
        }

        //run migration files which have not been previously run
        for(let i = 1; i < files.length; i++) {
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