import express from 'express';
import { billRouter } from './routers/bill-router.js';

// create server
const server = express();

// add in routers
server.use('/bill', billRouter);

// start server
server.listen(3000, () => {
    console.log('Listening for requests on port 3000');
});