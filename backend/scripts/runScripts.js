import dotenv from 'dotenv';
dotenv.config({
    path : '../.env' 
});
const { runMigrations } = await import('./runMigrations.js');

const runScripts = async() => {
    try {
        await runMigrations();
    }
    catch(err) {
        console.log("Could not run migrations",err);
    }
}

runScripts();