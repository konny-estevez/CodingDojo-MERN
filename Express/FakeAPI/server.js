const express = require("express");
const app = express();
const {createUser} = require("./Users");
const {createCompany} = require("./Companies");

app.get("/api", (req, res) => {
  res.send("Node server is working....");
});

const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);

app.get("/api/users/new", (req, res) => {
    res.send(createUser());
});

app.get("/api/companies/new", (req, res) => {
    res.send(createCompany());
});

app.get("/api/user/company", (req, res) => {
    res.send([createUser(), createCompany()]);
});