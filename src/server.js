require("express-async-errors");
require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3000;

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.json({
      status: error.statusError,
      message: error.message,
    });
  }

  console.log(error);

  return response.json({
    status: 501,
    message: "Erro interno do servidor.",
  });
});

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));
