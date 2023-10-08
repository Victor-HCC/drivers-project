const { Router } = require('express');
const driversRouter = Router();

const { getDriversHandler, getDriverByIdHandler, createDriverHandler } = require('../handlers/driversHandlers.js');

driversRouter.get('/', getDriversHandler);
driversRouter.get('/:id', getDriverByIdHandler);
driversRouter.post('/', createDriverHandler);

module.exports = driversRouter;
