require("express-async-errors");
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(json());

app.use(routes);

const PORT = 3333;

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));
