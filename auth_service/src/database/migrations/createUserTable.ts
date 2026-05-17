import { QueryTypes } from "sequelize";
import { dbInstance } from "../config/db.config";
import logger from "../../shared/logger";

const createUserTable = async () => {
            
            await dbInstance.query(`
                CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                user_name VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`, {
                type: QueryTypes.RAW
            })  
            logger.info('Users table created successfully!')


}

export default createUserTable