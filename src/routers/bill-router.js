import express from 'express';
import mysql from 'mysql';
import { pool } from '../connection.js';

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
    console.log(req.body);
    res.send({
        service: 'Create new bill'
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