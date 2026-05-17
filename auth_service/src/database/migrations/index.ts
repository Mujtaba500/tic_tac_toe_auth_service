import { ANY } from "../../shared/types";
import { errorHandler } from "../../utils/middleware/error-handler";

import {  dbInstance } from "../config/db.config";
import createUserTable from "./createUserTable";

const runMigrations = async () => {
    try {
        await dbInstance.authenticate()
        createUserTable()
        
    } catch (error: ANY) {
        console.log(error)
         errorHandler.handleError(error)
    }
}

runMigrations()