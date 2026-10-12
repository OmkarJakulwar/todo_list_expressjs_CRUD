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

//checks server is alive
app.get('/health', (req,res) => {
    res.status(200).send({ "status": "ok" });
});

app.get('/', (req,res) => {
    res.status(200).json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

const tasks = [
  {"id": 1, "title": "exam prep", "done": true}, 
  {"id": 2, "title": "homework", "done": false}, 
  {"id": 3, "title": "grocery shopping", "done": false}
];

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => String(t.id) === req.params.id);
  if(task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({"error": `Task '${req.params.id}' not found`});
  }
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})