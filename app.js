const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Read the auto-generated file
const port = 3000;
const app = express();
// Built-in Express middleware that intercepts incoming HTTP requests with Content-Type: application/json
app.use(express.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.post('/tasks/add', (req, res) => {
  const {title} = req.body;

  console.log('Received task', title);

  if(!title || typeof title !== 'string') {
    return res.status(400).json({"error": "Invalid task data"});
  }
  // set done to false if added the new task
  const newTask = {
    id: tasks.length + 1,
    title: title,
    done: false
  };
  tasks.push(newTask);
  res.status(201).json({
    status: "Created",
    message: "Task added successfully",
    task: newTask
  });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})