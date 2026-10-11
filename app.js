const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = 3000;
const app = express();
// Built-in Express middleware that intercepts incoming HTTP requests with Content-Type: application/json
app.use(express.json());

// Swagger definition options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'List Manager API',
      version: '1.0.0',
      description: 'API documentation for testing /addlist'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./app.js'], // Points to this file for JSDoc comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /addlist:
 *   post:
 *     summary: Add a new item to the list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               index:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: exam prep
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 index:
 *                   type: integer
 *                 name:
 *                   type: string
 */


app.get('/', (req,res) => {
    res.send('Hello Server!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})