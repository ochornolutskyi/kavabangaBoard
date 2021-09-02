const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

let tasks = [
  {
    id: "1",
    date: new Date("03/08/2021"),
    name: "Drink with team",
    description: "All of teammate should be very drunk",
    status: 1,
    user: "0",
  },
  {
    id: "2",
    date: new Date("03/08/2021"),
    name: "Make TechFriday for MobX",
    description: "Should to show a difference about Redux and MobX",
    status: 2,
    user: "1",
  },
  {
    id: "3",
    date: new Date("03/08/2021"),
    name: "Init report projec",
    description: "Init new project for TechFriday",
    status: 2,
  },
];

const USERS = [
  {
    id: "0",
    firstName: "Fidel",
    lastName: "Castro",
  },
];

app.get("/api/get-tasks", (req, res) => {
  res.send(tasks);
});

app.post("/api/set-task-user", (req, res) => {
  const { taskId, userId } = req.body;
  const updatedTask = tasks.find((task) => task.id === taskId);
  updatedTask.user = userId;
  res.send(updatedTask);
});

app.post("/api/set-task-status", (req, res) => {
  const { taskId, status } = req.body;
  const updatedTask = tasks.find((task) => task.id === taskId);
  updatedTask.status = status;
  res.send(updatedTask);
});

app.post("/api/add-task", (req, res) => {
  tasks.push(req.body);
  res.sendStatus(200);
});

app.get("/api/get-users", (req, res) => {
  res.send(USERS);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port...`);
});
