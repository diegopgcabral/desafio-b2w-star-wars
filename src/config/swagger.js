import swaggerJSDoc from 'swagger-jsdoc';

// swagger definition
const swaggerDefinition = {
  info: {
    description: 'API RESTFul de planetas de Star Wars',
    swagger: '2.0',
    title: 'Desafio B2W Star Wars',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
