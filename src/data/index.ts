import { exit } from "node:process";
import db from "../config/db";

async function clearDB(){
    try{
        await db.sync({ force: true });
        exit(0);
    }
    catch(error){
        console.log(error);
        exit(1);
    }
};

if( process.argv[2] === '--clear' ){
    clearDB();
};