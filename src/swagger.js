const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Projeto-03',
    description: 'Projeto avaliativo de API com node.js (Curso DevInHouse)',
  },
  host: 'localhost:4444',
  schemes: ['http'],
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/server.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);