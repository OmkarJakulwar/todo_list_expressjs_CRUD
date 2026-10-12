# Task Manager API

A minimalist, high-performance **RESTful Task Manager API** built using **Node.js** and **Express.js**. This project features clean route handling and fully uncoupled, standalone API documentation using an `openapi.json` schema layout served via an interactive **Swagger UI** portal.

---

## Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your local machine.

### Installation & Execution
You can download dependencies, map the structural workspace, and boot up your live API server using this single terminal command string:

```bash
npm install express swagger-ui-express && node app.js
```

Once running, you can access your endpoints at these portals:
* 🌐 **API Server root:** `http://localhost:3000`
* 📖 **Interactive Swagger UI:** `http://localhost:3000/docs`

---

## API Endpoints Index

| Method | Endpoint | Description | Expected Request Body | Response Success | Response Errors |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Verifies system runtime operational health status. | *None* | `200 OK` | — |
| **GET** | `/` | Retrieves global API index metadata and details. | *None* | `200 OK` | — |
| **GET** | `/tasks` | Extracts the comprehensive array collection of tasks. | *None* | `200 OK` | — |
| **GET** | `/tasks/:id` | Isolates a distinct singular task resource by its ID. | *None* | `200 OK` | `404 Not Found` |
| **POST** | `/tasks/add` | Initializes a new task with an auto-incrementing ID. | `{"title": "string"}` | `201 Created` | `400 Bad Request` |
| **PUT** | `/tasks/:id` | Completely overwrites/replaces a task's full schema body. | `{"title": "string", "done": bool}` | `200 OK` | `400 Bad / 404 Empty` |
| **PATCH**| `/tasks/:id` | Modifies specific parameters fields partially. | `{"title": "str"}` or `{"done": bool}` | `200 OK` | `400 Bad / 404 Empty` |
| **DELETE**| `/tasks/:id` | Erases a targeted task entry permanently. | *None* | `200 OK` | `404 Not Found` |

---

## Raw HTTP Interaction Sample

Executing `curl -i` against your resource creation endpoint returns the following network envelope and response header layout:

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 79
ETag: W/"4f-Z+vXU6q8Xp2DqE7tW3A3U4w8G4"
Date: Mon, 12 Oct 2026 12:34:56 GMT
Connection: keep-alive

{
  "status": "Created",
  "task": {
    "id": 4,
    "title": "Review project pull requests",
    "done": false
  }
}
```

---

## Swagger UI Documentation Interface

The interactive OpenAPI engine handles execution trials directly inside your web platform interface workspace:

![Swagger Dashboard](https://githubusercontent.com) 
*(Navigate directly to `http://localhost:3000/docs` to test, inspect components schemas, and send network parameters synchronously from your web client browser.)*
