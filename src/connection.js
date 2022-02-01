import fs from 'fs';
import YAML from 'yaml';
import mysql from 'mysql';

// load configuration file
const buffer = fs.readFileSync('conf/config.yaml', 'utf-8');
const config = YAML.parse(buffer);

export const pool = mysql.createPool(config.databaseConnectionInfo);