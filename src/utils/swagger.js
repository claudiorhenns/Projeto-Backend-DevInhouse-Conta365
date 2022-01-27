const swaggerAutoGe = require('swagger-autogen');
const swaggerFile = require('./swagger.json');
const endPointsFile = 'src/routes/index.js';
const swaggerAutogen = require('swagger-autogen');
const outputFile = 'src/swagger_output.json';

const doc = {
    info:{
        title: "my api",
        description: "dresciption",
    },
    host: "localhost:2222",
    schemes : ['http'],
};

swaggerAutogen(swaggerFile,endPointsFile,doc);