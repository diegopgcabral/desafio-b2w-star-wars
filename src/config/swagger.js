import swaggerJSDoc from 'swagger-jsdoc';

// swagger definition
const swaggerDefinition = {
  info: {
    description: 'Planetas API - B2W Desafio',
    swagger: '2.0',
    title: 'Swagger - API Planetas',
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
