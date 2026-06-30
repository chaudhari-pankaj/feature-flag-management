import dotenv from 'dotenv';
dotenv.config({
    path : '../.env' 
});
const { runMigrations } = await import('./runMigrations.js');
const { injectRoles } = await import('./injectRoles.js');

const runScripts = async() => {
    try {
        await runMigrations();
        await injectRoles();
    }
    catch(err) {
        console.log("Could not run all scripts",err);
    }
}

runScripts();