const express = require('express');
const routes = express.Router();

const financialRoutes = require('./v1/financial.routes');
const userRoutes = require('./v1/users.routes');


routes.use('/v1',[userRoutes, financialRoutes]);


module.exports = routes;
