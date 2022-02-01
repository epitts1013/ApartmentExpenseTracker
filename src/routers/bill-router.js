import express from 'express';
import { Validator } from 'jsonschema';
import mysql from 'mysql2';
import { pool } from '../connection.js';

const validator = new Validator();

export const billRouter = express.Router();
billRouter.use(express.json());

billRouter.get('/get', (req, res) => {
    res.send({
        endpoint: 'Get single bill'
    })
});

billRouter.get('/list', (req, res) => {
    res.send({
        service: 'Get bill list'
    });
});

billRouter.post('/create', (req, res) => {
    const requestSchema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "col_one": {
                "type": "string"
            },
            "col_two": {
                "type": "string"
            },
            "col_three": {
                "type": "number"
            }
        },
        "required": [
            "col_one",
            "col_two",
            "col_three"
        ]
    }
    const validatorResult = validator.validate(req.body, requestSchema);

    if (!validatorResult.valid) {
        console.error('Request body did not validate');
        res.send({
            status: 'Failed',
            error: 'Request body did not validate'
        });
        return;
    }

    let statement = 'INSERT INTO TestTable(col_one, col_two, col_three) VALUES(?,?,?);';
    let inserts = [req.body.col_one, req.body.col_two, req.body.col_three];
    pool.query(mysql.format(statement, inserts), (err) => {
        if (err) {
            console.error(err);
            res.send({
                status: 'Failed',
                error: 'Internal Server Error'
            });
            return;
        }

        res.send({
            status: 'Success',
            data: req.body
        });
    });
});

billRouter.put('/update', (req, res) => {
    res.send({
        service: 'Update bill data'
    });
});

billRouter.delete('/delete', (req, res) => {
    res.send({
        service: 'Delete bill data'
    });
});